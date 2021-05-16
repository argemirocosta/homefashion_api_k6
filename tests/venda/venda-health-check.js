import http from 'k6/http'
import * as urlUtils from '../../util/url-util.js'
import * as headersUtil from '../../util/headers-util.js'
import * as checkUtil from '../../util/check-util.js'

export let options = {
    vus: 10,
    duration: '10s'
}

export default function () {

    const URL = urlUtils.montarUrl("/venda/servidor")
    const HEADERS = headersUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(URL, HEADERS);

    checkUtil.checkHealthCheck(response)

}