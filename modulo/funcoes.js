/*
Objetivo: Arquivo responsavel pela criação das funções
Data: 08/04
Autor: Leandro
Versão: 1.0
*/

const dadosUtilizados = require('./contatos.js')

const dados = dadosUtilizados.contatos

function getListaDeTudo(){

    return dados

}

// console.log(getListaDeTudo())

function getListaDadosProfile(numero){

    
    let conteudo
    let resposta = []

    dados['whats-users'].forEach(function(itemUsers){

        if(itemUsers.number === numero)

        resposta.push({
            "nome" : itemUsers.account,
            "nick" : itemUsers.nickname,
            "foto" : itemUsers['profile-image'],
            "background" : itemUsers.background,
            "criacao_conta" : itemUsers['created-since'].start,
            "termino_conta" : itemUsers['created-since'].end
        })

    })

    return resposta

}

// console.log(getListaDadosProfile("11987876567"))

function getListaDadosContatos(numero){

    let conteudo = null
    let resposta = []

    dados['whats-users'].forEach(function(itemUsers){

        if(itemUsers.number == numero){

            itemUsers.contacts.forEach(function(itemContato){
                resposta.push({
                "nome" : itemContato.name,
                "foto" : itemContato.image,
                "descricao" : itemContato.description})
            })
        }
    })

    return resposta
}

// console.log(getListaDadosContatos("11987876567"))

function getListaDeMensagens(numero){

    let resposta = []

    dados['whats-users'].forEach(function(itemUsers){

        if(itemUsers.number === numero){

            itemUsers.contacts.forEach(function(itemContato){
                resposta.push(itemContato.messages)
            })

        }

    })

    return resposta

}

// console.log(getListaDeMensagens("11987876567"))

function getListaConversaEntreUsuarioEContato(numero){

}