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

    let conteudo = null

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

    }
    })

    if(conteudo){
        return conteudo
    }else{
        return false
    }

}

// console.log(getListaDadosProfile("11987876567"))

function getListaDadosContatos(numero){

    let conteudo = []

    dados['whats-users'].forEach(function(itemUsers){

        if(itemUsers.number == numero){

            itemUsers.contacts.forEach(function(itemContato){
                conteudo.push({
                    nome: itemContato.name,
                    foto: itemContato.image,
                    descricao: itemContato.description
                })
            })
        }
    })

    if(conteudo){
        return { resposta: conteudo }
    }else{
        return false
    }
    
}

// console.log(getListaDadosContatos("11987876567"))

function getListaDeMensagens(numero){

    let conteudo = []

    dados['whats-users'].forEach(function(itemUsers){

        if(itemUsers.number === numero){

            itemUsers.contacts.forEach(function(itemContato){
                conteudo.push(itemContato.messages)
            })

        }

    })

    if(conteudo){
        return { resposta: conteudo }
    }else{
        return false
    }
}

// console.log(getListaDeMensagens("11987876567"))

function getListaConversaEntreUsuarioEContato(numero, contato){

    let conteudo = []

    dados['whats-users'].forEach(function(itemUsers){

        if(String(itemUsers.number).trim() === String(numero).trim()){

            itemUsers.contacts.forEach(function(itemContato){

                if(String(itemContato.name).toLowerCase().trim().replace(/\s/g, '') === String(contato).toLowerCase().trim().replace(/\s/g, '') ){

                    conteudo.push({
                        name: itemContato.name,
                        description: itemContato.description,
                        messages: itemContato.messages
                    })

                }
            })
        }
    })

    if(conteudo){
        return { resposta: conteudo }
    }else{
        return false
    }
}

// console.log(getListaConversaEntreUsuarioEContato("11987876567","Ana Maria"))

function getFiltrarConversaGeral(numero, nomeContato, termo) {

    let conteudo = []

    dados['whats-users'].forEach(function(itemUsers) {
        
        if (itemUsers.number == numero) {

            itemUsers.contacts.forEach(function(itemContato){
                
                if (
                    itemContato.name.replace(/\s/g, '').toLowerCase() ===
                    nomeContato.replace(/\s/g, '').toLowerCase()
                ){
                    
                    itemContato.messages.forEach(function(itemMensagem){
                        
                        if (
                            itemMensagem.content.toLowerCase()
                            .includes(termo.toLowerCase())
                        ){
                            conteudo.push(itemMensagem)
                        }
                    })
                }
            })
        }
    })

    if(conteudo){
        return { resposta: conteudo }
    }else{
        return false
    }
}

// console.log(getFiltrarConversaGeral("11987876567", "Ana Maria", "Not"))

module.exports = {getListaDeTudo, 
    getListaDadosProfile, 
    getListaDadosContatos, 
    getListaDeMensagens, 
    getListaConversaEntreUsuarioEContato, 
    getFiltrarConversaGeral
}