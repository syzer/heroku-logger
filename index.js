const path = require('path')
const dgram = require('dgram')
const express = require('express')
const db = require('level')(path.resolve(__dirname, 'data'))
const compression = require('compression')
const bodyParser = require('body-parser')
const {map} = require('object-stream-tools')

const udpPort = process.env.UDP_PORT || 5001
const tcpPort = process.env.PORT || 5000
const socket = dgram.createSocket('udp4')

const app = express()
app.use(compression())
app.use(bodyParser.json())
// @see https://github.com/expressjs/body-parser#bodyparserrawoptions
app.use(bodyParser.text({limit: '512kb'}))
app.set('port', (tcpPort))

app.get('/', (req, res) =>
  db.createReadStream(
    Object.assign(
      {keys: true},
      req.query,
      JSON.parse(req.query.q || '{}'),
      {
        limit: parseInt(req.query.limit, 10) || 100,
        reverse: true
      },
    ))
    .on('error', console.error)
    .pipe(map(({key, value}) =>
      new Date(parseInt(key, 10)).toISOString() + ' ' + value + '\n'
    ))
    .pipe(res)
)

app.post('/', (req, res) =>
  db.put(Date.now(), req.body, {encoding: 'json'})
    .then(() => res.status(200).end())
    .catch(() => res.status(500).end())
)

socket.on('listening', () =>
  console.log(`UDP server is running on port`, socket.address().port)
)

socket.on('error', err =>
  console.error(`UDP error: ${err.stack}`)
)

socket.on('message', msg =>
  db.put(Date.now(), JSON.parse(msg.toString()), {encoding: 'json'})
)

socket.bind(udpPort)

app.listen(app.get('port'), () =>
  console.log('TCP server is running on port', app.get('port'))
)

module.exports = {
  app,
  socket,
  udpPort
}
