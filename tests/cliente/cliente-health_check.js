import http from 'k6/http'
import {check} from 'k6'
import encoding from "k6/encoding";

export let options = {
    vus: 10,
    duration: '10s'
}

const username = 'usuario1';
const password = 'senha1';

export default function (){

    const credentials = `${username}:${password}`;

    const url = "http://localhost:8080/cliente/servidor";

    let response = http.get(url,
        {headers: {"Authorization": "Basic " + encoding.b64encode(credentials)}});

    check(response, {
        "status is 200": (r) => r.status === 200,
        "is correct message:": (r) => r.body === "Servidor no ar"
    });

}