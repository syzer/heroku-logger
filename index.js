let express = require('express')
let app = express()
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

let bodyParser = require('body-parser')
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

app.set('port', (process.env.PORT || 5000))

let logs = require('./data/log.json')

app.get('/', (req, res) => {
    return res.json(logs)
})

app.post('/', (req, res) => {
    console.log(req.body, typeof req.body)
    logs.push(req.body);

    fs.writeFileAsync(__dirname + '/data/log.json', JSON.stringify(logs))
        .catch(console.error)

    return res.json(logs)
})

app.listen(app.get('port'), () =>
    console.log('Node app is running on port', app.get('port'))
)




