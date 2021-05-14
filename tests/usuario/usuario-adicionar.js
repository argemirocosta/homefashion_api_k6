import http from 'k6/http'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {SharedArray} from "k6/data";
import * as payloadUtil from '../../util/payload-util.js'
import * as headersUtil from "../../util/headers-util.js";
import * as urlUtils from "../../util/url-util.js";
import * as checkUtil from "../../util/check-util.js";

const csvData = new SharedArray("data from csv file", function () {
    return papaparse.parse(open('../../resources/usuario/./usuario-adicionar.csv'),
        {header: true}).data;
});

export default function () {

    const url = urlUtils.montarUrl("/usuarios")

    const headers = headersUtil.montarHeadersComBasicAuthEContentTypeJson()

    for (let userPwdPair of csvData) {
        console.log(JSON.stringify(userPwdPair));
    }

    let randomUser = csvData[Math.floor(Math.random() * csvData.length)];

    var payload = payloadUtil.montarPayloadUsuarioAdicionar(
        randomUser.nome, randomUser.login, randomUser.senha)

    let response = http.post(url, payload, headers);

    checkUtil.checkCreate(response)

}