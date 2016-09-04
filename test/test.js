import request from 'supertest'
import test from 'ava'
import {app} from '../index'

const data = [{1: 'ok'}, 'plain-text']

test('adding keys', t => {
    request(app)
        .post('/')
        .set('Accept', 'application/json')
        .send(data[0])
        .expect('Content-Type', /json/)
        .end(err => {
            if (err) {
                return t.fail(err)
            }
            return t.pass()
        })
})

test('reading stream', t => {
    request(app)
        .get('/')
        .set('Accept', 'application/json')
        .end(err => {
            if (err) {
                return t.fail(err)
            }
            return t.pass()
        })
})

test('querying database', t => {
    const query = [
        JSON.stringify({gt: '1473017287456'}),
        'limit=1'
    ].join('&')

    request(app)
        .get(`/?q=${query}`)
        .set('Accept', 'application/json')
        .set('Accept-Encoding', 'gzip,deflate')
        .end((err, res) => {
            if (err) {
                return t.fail(err)
            }
            t.truthy(res.text)
            return t.pass()
        })
})
