import http from 'k6/http'
import {check} from 'k6'
import * as urlUtils from '../../util/url_util.js'
import * as paramUtil from '../../util/param_util.js'

export let options = {
    vus: 10,
    duration: '10s'
}

export default function (){

    const url = urlUtils.montarUrl("/venda/servidor")
    const param = paramUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(url, param);

    check(response, {
        "status is 200": (r) => r.status === 200,
        "is correct message:": (r) => r.body === "Servidor no ar"
    });

}