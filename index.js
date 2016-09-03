const path = require('path')
const express = require('express')
const db = require('level')(path.resolve(__dirname, 'data'))
const compression = require('compression')
const bodyParser = require('body-parser')

let app = express()
app.use(compression())
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))

app.get('/', (req, res) => {
    res.writeHead(200, {'content-encoding': 'deflate'})
    db.createValueStream()
        .on('error', console.error)
        .pipe(res)
})

app.post('/', (req, res) => {
    db.put(new Date(), req.body, {encoding: 'json'}, err => {
        if (err) {
            return res.status(500).end()
        }

        return res.status(200).end()
    })
})

app.listen(app.get('port'), () =>
    console.log('Node app is running on port', app.get('port'))
)

module.exports = {
    app
}
