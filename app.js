/*
Objetivo: Arquivo responsavel pela criação do Clone-WhatsApp
Data: 08/04
Autor: Leandro
Versão: 1.0
*/

//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações do cors da API
const cosrsOptions = {
    origin : ['*'],  //Configuração de origem da requisição (IP ou o dominio)
    methods: 'GET', //Configuração dos metodos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization']   //Configurações de permissoes
                    //Tipode de dados   Autorização de acesso

}

//Aplica as configurações do cors no app (Express)
app.use(cors(cosrsOptions))

const whatsApp = require('./modulo/funcoes.js')

app.get('/v1/whatsapp/dados', function(request, response){
    let dados = whatsApp.getListaDeTudo()

    if(dados){
        response.status(200)
        response.json(dados)

    }else{
        response.status(404)
        response.json({'message' : "Algo deu errado"})
    }
})

app.get('/v1/whatsapp/dados/usuario/:numero', function(request, response){
    let profile = request.params.numero
    let dadosProfile = whatsApp.getListaDadosProfile(profile)

    if(dadosProfile){
        response.status(200)
        response.json(dadosProfile)

    }else{
        response.status(404)
        response.json({'message' : "Algo deu errado"})
    }
})

app.get('/v1/whatsapp/usuario/contatos/dados/:numero', function(request, response){
    let contato = request.params.numero
    let dadosContatos = whatsApp.getListaDadosContatos(contato)

    if(dadosContatos){
        response.status(200)
        response.json(dadosContatos)

    }else{
        response.status(404)
        response.json({'message' : 'Algo deu errado'})
    }
})

app.get('/v1/whatsapp/usuario/contatos/mensagens/:numero', function(request, response){
    let mensagens = request.params.numero
    let dadosTodasMensagens = whatsApp.getListaDeMensagens(mensagens)

    if(dadosTodasMensagens){
        response.status(200)
        response.json(dadosTodasMensagens)

    }else{
        response.status(404)
        response.json({'message' : 'Algo deu errado'})
    }
})

app.get('/v1/whatsapp/usuario/mensagens/contatos/especificos', function(request, response){
    let numeroProfile = request.query.numero
    let contato = request.query.contato

    let dadosMensagemContato = whatsApp.getListaConversaEntreUsuarioEContato(numeroProfile, contato)

    if(dadosMensagemContato){
        response.status(200)
        response.json(dadosMensagemContato)

    }else{
        response.status(404)
        response.json({'message' : 'Algo deu errado'})
    }
})

app.get('/v1/whatsapp/termo', function(request, response){
    let numeroProfile = request.query.numero
    let nomeContato = request.query.nomecontato
    let termo = request.query.termo

    let dadosMensagemContato = whatsApp.getFiltrarConversaGeral(numeroProfile, nomeContato, termo)

    if(dadosMensagemContato){
        response.status(200)
        response.json(dadosMensagemContato)

    }else{
        response.status(404)
        response.json({'message' : 'Algo deu errado'})
    }
})

//Endpoint help (Padrão mercado)
app.get('/v1/whatsapp/help', function(request, response){

    let docAPI = {
        "api-description": "API para simulação de funcionalidades do WhatsApp (usuários, contatos e mensagens)",
        "date": "08/04/2026",
        "development": "Leandro dos Reis Filho",
        "version": "1.0",
        "endpoints": [

            {
                "rota": "GET /v1/whatsapp/dados",
                "description": "Retorna todos os dados da aplicação (usuários, contatos e mensagens)"
            },
            {
                "rota": "GET /v1/whatsapp/dados/usuario/:numero",
                "description": "Retorna os dados de um usuário específico pelo número"
            },
            {
                "rota": "GET /v1/whatsapp/usuario/contatos/dados/:numero",
                "description": "Retorna a lista de contatos de um usuário"
            },
            {
                "rota": "GET /v1/whatsapp/usuario/contatos/mensagens/:numero",
                "description": "Retorna todas as mensagens dos contatos de um usuário"
            },
            {
                "rota": "GET /v1/whatsapp/usuario/mensagens/contatos/especificos?numero={numero}&contato={nome}",
                "description": "Retorna a conversa entre um usuário e um contato específico"
            },
            {
                "rota": "GET /v1/whatsapp/termo?numero={numero}&nomecontato={nome}&termo={palavra}",
                "description": "Filtra mensagens de um contato específico com base em um termo"
            }

        ]
    }

    response.status(200)
    response.json(docAPI)
})

//Iniciando API
app.listen(8080, function(){
    console.log('API aguaradando novas requisições ...')
})
