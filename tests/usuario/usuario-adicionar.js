import http from 'k6/http'
import {check} from 'k6'
import encoding from "k6/encoding";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {SharedArray} from "k6/data";

const username = 'usuario1';
const password = 'senha1';

const csvData = new SharedArray("data from csv file", function () {
    return papaparse.parse(open('../../resources/usuario/./usuario-adicionar.csv'),
        {header: true}).data;
});

export default function () {

    const credentials = `${username}:${password}`;

    const url = "http://localhost:8080/usuarios";

    for (var userPwdPair of csvData) {
        console.log(JSON.stringify(userPwdPair));
    }

    let randomUser = csvData[Math.floor(Math.random() * csvData.length)];

    var payload = JSON.stringify({
        "nome": randomUser.nome,
        "login": randomUser.login,
        "senha": randomUser.senha,
        "ativo": true
    });

    var headers = {
        headers: {
            "Authorization": "Basic " + encoding.b64encode(credentials),
            "Content-Type": "application/json"
        },
    };

    let response = http.post(url, payload, headers);

    const check1 = check(response, {
        "status is 201": (r) => r.status === 201
    });

}