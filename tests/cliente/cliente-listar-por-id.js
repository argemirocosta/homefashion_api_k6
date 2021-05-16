import http from 'k6/http'
import {Rate} from 'k6/metrics'
import * as urlUtils from '../../util/url-util.js'
import * as headersUtil from '../../util/headers-util.js'
import * as checkUtil from '../../util/check-util.js'

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

    const ID_CLIENTE = 234

    const URL = urlUtils.montarUrl(`/cliente/${ID_CLIENTE}`)
    const HEADERS = headersUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(URL, HEADERS);

    console.log(`response body ${response.body} for VU ${__VU} in ITERA ${__ITER}`)

    const CHECK_1 = checkUtil.checkListarPorId(response)
    const CHECK_2 = checkUtil.checkError(response, 400)

    errorRate.add(CHECK_1)
    errorRate.add(CHECK_2)

}