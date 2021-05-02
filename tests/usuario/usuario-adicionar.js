import http from 'k6/http'
import {check} from 'k6'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {SharedArray} from "k6/data";
import * as payloadUtil from '../../util/payload_util.js'
import * as paramUtil from "../../util/param_util.js";
import * as urlUtils from "../../util/url_util.js";

const csvData = new SharedArray("data from csv file", function () {
    return papaparse.parse(open('../../resources/usuario/./usuario-adicionar.csv'),
        {header: true}).data;
});

export default function () {

    const url = urlUtils.montarUrl("/usuarios")

    const param = paramUtil.montarHeadersComBasicAuthEContentTypeJson()

    for (var userPwdPair of csvData) {
        console.log(JSON.stringify(userPwdPair));
    }

    let randomUser = csvData[Math.floor(Math.random() * csvData.length)];

    var payload = payloadUtil.montarPayloadUsuarioAdicionar(
        randomUser.nome, randomUser.login, randomUser.senha)

    let response = http.post(url, payload, param);

    const check1 = check(response, {
        "status is 201": (r) => r.status === 201
    });

}