import http from 'k6/http'
import {check} from 'k6'
import * as payloadUtil from '../../util/payload_util.js'
import * as headersUtil from "../../util/headers_util.js";
import * as urlUtils from "../../util/url_util.js";

export default function () {

    const url = urlUtils.montarUrl("/cliente")

    const payload = payloadUtil.montarPayloadClienteAdicionar(
        "TESTE 110", "07725791485", 155)

    const headers = headersUtil.montarHeadersComBasicAuthEContentTypeJson()

    let response = http.post(url, payload, headers);

    const check1 = check(response, {
        "status is 201": (r) => r.status === 201
    });

}