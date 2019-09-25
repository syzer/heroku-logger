import dgram from 'dgram'
import {promisify} from 'util'
import request from 'supertest-as-promised'
import test from 'ava'
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
  const message = {2: 'My KungFu is Good!'}
  const buffer = Buffer.from(JSON.stringify((message)))

  await sendAsync(buffer, 0, buffer.length, udpPort, '0.0.0.0')
    .then(() => client.close())

  await request(app)
    .get('/?limit=100')
    .set('Accept', 'application/json')
    .expect(200)
    .then(d => {
      // test if all are correct objects
      const messages = d.text.replace(/}{/g, '}|{').split('|').map(JSON.parse)
      // contain correct string
      t.truthy(messages.find(e => e[2] === message[2]))
    })
})
