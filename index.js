let express = require('express')
let app = express()

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

let logs = [];

app.get('/', (req, res) => {
    // response.render('pages/index')
    return res.json(logs)
})

app.post('/', (req, res) => {
    logs.push(req);
    return res.json({
        i: 'am alive'
    })
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})




