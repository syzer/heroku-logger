let express = require('express')
let app = express()

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function (request, response) {
    response.render('pages/index')
})

app.post('/', (req, res) => {
    response.json({
        i: 'am alive'
    })
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})




