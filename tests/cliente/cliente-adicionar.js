import http from 'k6/http'
import * as payloadUtil from '../../util/payload-util.js'
import * as headersUtil from "../../util/headers-util.js";
import * as urlUtils from "../../util/url-util.js";
import * as checkUtil from '../../util/check-util.js'

export default function () {

    const URL = urlUtils.montarUrl("/cliente")

    const PAYLOAD = payloadUtil.montarPayloadClienteAdicionar(
        "TESTE 110", "07725791485", 155)

    const HEADERS = headersUtil.montarHeadersComBasicAuthEContentTypeJson()

    let response = http.post(URL, PAYLOAD, HEADERS);

    checkUtil.checkCreate(response)

}