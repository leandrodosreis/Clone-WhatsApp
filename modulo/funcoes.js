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

        if(itemUsers.number === numero){

        conteudo = {
            "nome" : itemUsers.account,
            "nick" : itemUsers.nickname,
            "foto" : itemUsers['profile-image'],
            "background" : itemUsers.background,
            "criacao_conta" : itemUsers['created-since'].start,
            "termino_conta" : itemUsers['created-since'].end
        }

        // resposta.push(conteudo)
    }
    })

    return conteudo
    // return resposta

}

// console.log(getListaDadosProfile("11987876567"))

function getListaDadosContatos(numero){

    let conteudo 
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

    // return resposta
    return conteudo = {resposta}
}

// console.log(getListaDadosContatos("11987876567"))

function getListaDeMensagens(numero){

    let conteudo

    let resposta = []

    dados['whats-users'].forEach(function(itemUsers){

        if(itemUsers.number === numero){

            itemUsers.contacts.forEach(function(itemContato){
                resposta.push(itemContato.messages)
            })

        }

    })

    return resposta
    // return conteudo = {resposta}

}

// console.log(getListaDeMensagens("11987876567"))

function getListaConversaEntreUsuarioEContato(numero, contato){

    let conteudo
    let resposta = []

    dados['whats-users'].forEach(function(itemUsers){

    if(String(itemUsers.number).toUpperCase().trim() === String(numero).toUpperCase().trim()){
        itemUsers.contacts.forEach(function(itemContato){
            if(String(itemContato.name).toUpperCase().trim() === String(contato).toUpperCase().trim()){
                resposta.push({
                    "name": itemContato.name,
                    "description" : itemContato.description,
                    "messages" : itemContato.messages
                })
                
                return conteudo = {resposta}
            }
        })
    }
    })

    return conteudo
}

// console.log(getListaConversaEntreUsuarioEContato("11987876567","Jane Smith"))

function getFiltrarConversaGeral(numero, nomeContato, termo) {
    let status = null
    let resposta = []
    

    dados['whats-users'].forEach(function(itemUsers) {
        
        if (String(numero).trim() == String(itemUsers.number).trim()) {

            itemUsers.contacts.forEach(function(itemContato){
                
                if(String(nomeContato).trim() == String(itemContato.name).trim()){
                    
                    itemContato.messages.forEach(function(itemMensagem){
                        
                        if (itemMensagem.content.includes(termo)) {
                            status = true
                            resposta.push(itemMensagem)
                            
                        }
                    })
                }
            })
        }
    })


    if (!status) {
        return false
    }

    let conteudo = {
        mensagensFiltradas: resposta
    }

    return conteudo
}

// console.log(getFiltrarConversaGeral("11987876567", "Ana Maria", "Not"))

module.exports = {getListaDeTudo, 
    getListaDadosProfile, 
    getListaDadosContatos, 
    getListaDeMensagens, 
    getListaConversaEntreUsuarioEContato, 
    getFiltrarConversaGeral
}