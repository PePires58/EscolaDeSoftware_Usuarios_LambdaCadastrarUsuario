exports.CreateObject = function (jsonBody) {
    return {
        email: jsonBody.email,
        nome: jsonBody.nome,
        sobrenome: nome.sobrenome,
        identification: {
            type: 'CPF',
            number: jsonBody.cpf
        }
    };
}