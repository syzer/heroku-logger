import test from 'ava'
import {app} from '../index'
import request from 'supertest'

const data = {
    1: "ok"
}

test('adding keys', t => {
    request(app)
        .post('/')
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .end((err, res) => {
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
        .end((err, res) => {
            if (err) {
                return t.fail(err)
            }
            // console.log(res.text)
            return t.pass()
        })

})

test('bar', async t => {
    const bar = Promise.resolve('bar')

    t.is(await bar, 'bar')
})
