let express = require('express')
let app = express()
const levelup = require('levelup')
const db = levelup('./data')
const compression = require('compression')
app.use(compression())

const bodyParser = require('body-parser')
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded

app.set('port', (process.env.PORT || 5000))

app.get('/', (req, res) => {
    res.writeHead(200, { 'content-encoding': 'deflate' });
    db.createValueStream()
        .on('data', console.log)
        .on('error', (err) => console.error)
        .pipe(res)
})

app.post('/', (req, res) => {
    const date = new Date()
    db.put(date, req.body, {encoding: 'json'}, (err) => {
        if (err) return res.status(500).end()

        return res.status(200).end()
    })
})

app.listen(app.get('port'), () =>
    console.log('Node app is running on port', app.get('port'))
)

module.exports = {
    app
}


