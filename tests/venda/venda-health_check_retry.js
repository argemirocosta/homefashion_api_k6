import http from 'k6/http'
import {Counter} from 'k6/metrics'
import {sleep} from 'k6'
import * as urlUtils from "../../util/url_util.js";
import * as paramUtil from "../../util/param_util.js";

var retryCounter = new Counter("GetAPI_MAX_RETRY")

export default function () {

    const url = urlUtils.montarUrl("/venda/servidor")
    const param = paramUtil.montarHeadersApenasComBasicAuth()

    let response = http.get(url, param);

    var maxAttemps=5
    retryCounter.add(1)
    for(var retries=maxAttemps; retries>0; retries--) {
        var numberOfAttemps = maxAttemps - retries + 1

        if (response.status !== 201) {
            retryCounter.add(1)
            console.log(`response is not correct. attemp is ${retries}, VU=${__VU}, ITER=${__ITER}`)
            sleep(1)
        } else {
            retries == 0
        }
    }

}
