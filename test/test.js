import request from 'supertest-as-promised'
import test from 'ava'
import {app} from '../index'

const data = {1: 'ok'}

test('adding keys', () => request(app)
  .post('/')
  .set('Accept', 'application/json')
  .send(data)
  .expect(200)
  .expect('transfer-encoding', /chunked/)
)

test('reading stream', t => request(app)
  .get('/')
  .set('Accept', 'application/json')
  .expect(200)
  .then(d => t.regex(d.text, /1/))
)

test('querying database', t => request(app)
  .get(`/?q=${[
    JSON.stringify({gt: '1473017287456'}),
    'limit=1'
  ].join('&')}`)
  .set('Accept', 'application/json')
  .set('Accept-Encoding', 'gzip,deflate')
  .then(d => t.regex(d.text, /"ok"/))
)
