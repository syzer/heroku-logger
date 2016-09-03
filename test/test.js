import request from 'supertest'
import test from 'ava'
import {app} from '../index'

const data = {
    1: 'ok'
}

test('adding keys', t => {
    request(app)
        .post('/')
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .end(err => {
            if (err) {
                return t.fail(err)
            }
            return t.pass()
        })
})

test('reading', t => {
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
