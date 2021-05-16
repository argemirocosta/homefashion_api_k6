import http from 'k6/http'
import * as payloadUtil from '../../util/payload-util.js'
import * as headersUtil from "../../util/headers-util.js";
import * as urlUtils from "../../util/url-util.js";
import * as checkUtil from "../../util/check-util.js";
import * as csvUtil from "../../util/csv-util.js"

let massaDeDados = csvUtil.pegarDadoDaMassa('../../resources/usuario/./usuario-adicionar.csv')

export default function () {

    const url = urlUtils.montarUrl("/usuarios")

    const headers = headersUtil.montarHeadersComBasicAuthEContentTypeJson()

    var payload = payloadUtil.montarPayloadUsuarioAdicionar(
        massaDeDados.nome, massaDeDados.login, massaDeDados.senha)

    let response = http.post(url, payload, headers);

    checkUtil.checkCreate(response)

}