const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const pergunta = require('./database/pergunta')
const Resposta = require('./database/Resposta')

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log('msgErro')
    })

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res) => {
    pergunta.findAll({ raw: true, order: [
        ['id','DESC']
    ]}).then(perguntas => {
        res.render('index',{
            perguntas: perguntas
        })
    })
    
})

app.get('/perguntar',(req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id',(req, res) => {
    var id = req.params.id
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaid: pergunta.id},
                order:[ ['id','DESC'] ]
            }).then(respostas => {
                res.render('pergunta',{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })   

        }else {
            res.redirect('/')
        }
    
    })
}) 

app.post('/responder',(req, res) => {
    var corpo = req.body.corpo
    var perguntaid = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaid: perguntaid
    }).then(() => {
        res.redirect(`/pergunta/${perguntaid}`)
    })
})

app.listen(8080,() => {
    console.log('Servidor rodando');});