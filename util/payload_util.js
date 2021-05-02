export function montarPayloadClienteAdicionar(nome, cpf, idUsuario) {
    return JSON.stringify({
        "nome": nome,
        "cpf": cpf,
        "usuario": {
            "id": idUsuario
        }
    });
}