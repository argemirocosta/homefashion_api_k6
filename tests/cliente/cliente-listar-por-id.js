import http from 'k6/http'
import {check} from 'k6'
import {Rate} from 'k6/metrics'
import * as urlUtils from '../../util/url-util.js'
import * as headersUtil from '../../util/headers-util.js'

export let errorRate = new Rate('errors')

export let options = {
    stages: [
        {duration: '1s', target: 1},
        {duration: '1s', target: 1}
    ],
    threshold: {
        erros: ['rate<0.1'] //10% error
    }
}

export default function () {

    const idCliente = 234

    const url = urlUtils.montarUrl(`/cliente/${idCliente}`)
    const headers = headersUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(url,headers);

    console.log(`response body ${response.body} for VU ${__VU} in ITERA ${__ITER}`)

    const check1 = check(response, {
        "status is 200": (r) => r.status === 200,
        "is correct user": (r) => r.json().id === idCliente,
        "is correct cpf": (r) => r.json().cpf === "90451718054"
    });

    const check2 = check(response, {
        "status is 400": (r) => r.status === 400,
        "is correct user is": (r) => r.json().id === 235
    });

    errorRate.add(check1)
    errorRate.add(check2)

}