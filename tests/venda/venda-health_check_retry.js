import http from 'k6/http'
import encoding from 'k6/encoding';
import {Counter} from 'k6/metrics'
import {sleep} from 'k6'

var retryCounter = new Counter("GetAPI_MAX_RETRY")

const username = 'usuario1';
const password = 'senha1';

export default function () {

    const credentials = `${username}:${password}`;

    const url = "http://localhost:8080/venda/servidor";

    let response = http.get(url,
        {headers: {"Authorization": "Basic " + encoding.b64encode(credentials)}});

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
