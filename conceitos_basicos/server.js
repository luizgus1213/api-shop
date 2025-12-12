const express = require('express')//importa a biblioteca do express
const port = 3000//cria variavel que guarda o valor da porta usada no servidor
const app = express()//cria o servidor

app.use(express.json())//faz ele entender o formado de JSON

app.get('/toddynho', (req, res)=> res.status(200).send({mensagem: 'toddydho'})) //configura rota get no /toddynho
app.post('/toddynho', (req, res)=> res.status(200).send({mensagem: 'toddydho'}))//configura rota post no /toddynho

app.listen(port, ()=> console.log(`Servidor rodando na porta ${port}`))//coloca o servidor para rodar na porta configurada na variavel port

