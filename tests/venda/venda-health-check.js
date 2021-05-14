import http from 'k6/http'
import {check} from 'k6'
import * as urlUtils from '../../util/url-util.js'
import * as headersUtil from '../../util/headers-util.js'
import * as checkUtil from '../../util/check-util.js'

export let options = {
    vus: 10,
    duration: '10s'
}

export default function (){

    const url = urlUtils.montarUrl("/venda/servidor")
    const headers = headersUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(url, headers);

    checkUtil.checkHealthCheck(response)

}