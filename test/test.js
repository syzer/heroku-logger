import dgram from 'dgram'
import {promisify} from 'util'
import request from 'supertest-as-promised'
import test from 'ava'
import execa from 'execa'
import {app, udpPort} from '../index'

const client = dgram.createSocket('udp4')
const sendAsync = promisify(client.send.bind(client))
const data = {1: 'ok'}

test('adding keys', () => request(app)
  .post('/')
  .set('Accept', 'application/json')
  .send(data)
  .expect(200)
  .expect('transfer-encoding', /chunked/)
)

test('reading stream', t => request(app)
  .get('/?limit=100')
  .set('Accept', 'application/json')
  .expect(200)
  .then(d => t.regex(d.text, /1/))
)

test('querying database', t => request(app)
  .get(`/?q=${[
    JSON.stringify({gt: '1473017287456'}),
    'limit=100'
  ].join('&')}`)
  .set('Accept', 'application/json')
  .set('Accept-Encoding', 'gzip,deflate')
  .then(d => t.regex(d.text, /"ok"/))
)

test('sending message via UDP', async t => {
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
        .map(e => e[1] && JSON.parse(e[1]))

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

test('Send stacktrace AKA non-json', async t => {
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
