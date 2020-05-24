import dgram from 'dgram'
import {promisify} from 'util'
import request from 'supertest-as-promised'
import test from 'ava'
import execa from 'execa'
import {always, tryCatch} from 'ramda'
import {app, udpPort} from '../index'

const client = dgram.createSocket('udp4')
const sendAsync = promisify(client.send.bind(client))
const data = {1: 'ok'}
const maybeParse = tryCatch(JSON.parse, always('')) // handles non json values

test('Adding keys', () => request(app)
  .post('/')
  .set('Accept', 'application/json')
  .send(data)
  .expect(200)
  .expect('transfer-encoding', /chunked/)
)

test('Reading stream', t => request(app)
  .get('/?limit=100')
  .set('Accept', 'application/json')
  .expect(200)
  .then(d => t.regex(d.text, /1/))
)

test('Querying database', t => request(app)
  .get(`/?q=${[
    JSON.stringify({gt: '1473017287456'}),
    'limit=100'
  ].join('&')}`)
  .set('Accept', 'application/json')
  .set('Accept-Encoding', 'gzip,deflate')
  .then(d => t.regex(d.text, /"ok"/))
)

test('Sending message via UDP', async t => {
  const message = {value: 'My KungFu is Good!'}
  const buffer = Buffer.from(JSON.stringify((message)))

  await sendAsync(buffer, 0, buffer.length, udpPort, '0.0.0.0')
    .then(() => client.close())

  await request(app)
    .get('/?limit=100')
    .set('Accept', 'application/json')
    .expect(200)
    .then(d => {
      // test if all are correct objects
      const messages = d.text.split('\n')
        .map(e => e.split('Z '))
        .map(e => e[1] && maybeParse(e[1]))
        .filter(Boolean)

      // contain correct string
      t.truthy(messages.find(e => e.value === message.value))
    })
})

test('Query cli usage', async t => {
  const {stdout, stderr} = await execa.command(
    './query.sh \'2 min ago\' | grep KungFu',
    {shell: true}
  )
  t.truthy(stdout)
  t.falsy(stderr)
})

test('Send TCP stacktrace AKA non-json', async t => {
  const {stdout, stderr} = await execa.command(
    'curl -s -X POST -H "Content-Type: text/plain" -d @./test/example.java.stacktrace.txt localhost:5000',
    {shell: true}
  )
  t.falsy(stdout) // server is not 'chatty'
  t.falsy(stderr)

  const query = await execa.command(
    './query.sh \'2 min ago\' | grep inte',
    {shell: true}
  )
  t.truthy(query.stdout)
  t.falsy(query.stderr)
})

test('Send UDP stacktrace AKA non-json', async t => {
  const {stdout, stderr} = await execa.command(
    'echo "nginx.status_200:1|c" | nc -u -w0 127.0.0.1 5001',
    {shell: true}
  )
  t.falsy(stdout) // server is not 'chatty'
  t.falsy(stderr)

  const query = await execa.command(
    './query.sh \'2 min ago\' | grep nginx',
    {shell: true}
  )
  t.truthy(query.stdout)
  t.falsy(query.stderr)
})

const delay = seconds =>
  new Promise((resolve =>
    setTimeout(resolve, seconds * 1000)))

test('Query time ranges', async t => {
  await execa.command(
    'echo "test.status_200:1|c" | nc -u -w0 127.0.0.1 5001',
    {shell: true}
  )

  const queryOk = await execa.command(
    './query.sh \'10 min ago\' | grep test',
    {shell: true}
  )

  t.truthy(queryOk.stdout)
  t.falsy(queryOk.stderr)

  await delay(2.5) // Timings are hard

  return await execa.command(
    './query.sh \'2 sec ago\' | grep test',
    {shell: true}
  )
    .then(() =>
      t.fail('Should have no messages in that time'))
    .catch(() =>
      t.pass('No reply in that time interval'))
})

test('Query localserver', async t => {
  const queryOk = await execa.command(
    './query.sh \'5 min ago\' | grep nginx',
    {
      shell: true,
      env: {
        SYSLOG_SRV: '127.0.0.1'
      }
    }
  )
  t.truthy(queryOk.stdout)
  t.falsy(queryOk.stderr)
})

test('Query remote server', t =>
  execa.command(
    './query.sh \'5 min ago\' | grep nginx',
    {
      shell: true,
      env: {
        SYSLOG_SRV: '1.1.1.1' // let's hope this server is not on :)
      }
    }
  )
    .then(() =>
      t.fail('Should have no messages from that server'))
    .catch(() =>
      t.pass('This server has no mesasges but respond ok'))
)
