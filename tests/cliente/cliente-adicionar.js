import http from 'k6/http'
import {check} from 'k6'
import encoding from "k6/encoding";

const username = 'usuario1';
const password = 'senha1';

export default function () {

    const credentials = `${username}:${password}`;

    const url = "http://localhost:8080/cliente";

    var payload = JSON.stringify({
        "nome": "TESTE 109",
        "cpf": "07725791485",
        "usuario": {
            "id": 155
        }
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