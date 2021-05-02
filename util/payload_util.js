export function montarPayloadClienteAdicionar(nome, cpf, idUsuario) {
    return JSON.stringify({
        "nome": nome,
        "cpf": cpf,
        "usuario": {
            "id": idUsuario
        }
    });
}

export function montarPayloadUsuarioAdicionar(nome, login, senha) {
    return JSON.stringify({
        "nome": nome,
        "login": login,
        "senha": senha,
        "ativo": true
    });
}