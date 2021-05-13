import http from 'k6/http'
import {check} from 'k6'
import * as urlUtils from '../../util/url-util.js'
import * as headersUtil from '../../util/headers-util.js'

export let options = {
    vus: 10,
    duration: '10s'
}

export default function (){

    const url = urlUtils.montarUrl("/pagamento/servidor")
    const headers = headersUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(url,headers);

    check(response, {
        "status is 200": (r) => r.status === 200,
        "is correct message:": (r) => r.body === "Servidor no ar"
    });

}