let express = require('express')
let app = express()

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/' + 'public/'))

app.get('/', (req, res) => {
    (async () => {
        let memes = await require('./modules/root')
        res.render('index.pug', {
            memes
        })
    })()
})

app.get('/editor/', (req, res) => {
    res.render('editor.pug', {
        template : req.query.template
    })
})

app.listen(3000)