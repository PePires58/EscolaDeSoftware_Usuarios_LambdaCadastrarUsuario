exports.createUserPutItem = function (user) {
    return {
        "email": {
            S: user.email
        },
        "nome": {
            S: user.nome
        },
        "sobrenome": {
            S: user.sobrenome
        },
        "cpf": {
            S: user.cpf
        },
        "senha": {
            S: user.senha
        }
    }
}