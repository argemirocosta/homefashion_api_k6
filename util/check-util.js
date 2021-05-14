import {check} from 'k6'

export function checkHealthCheck(response) {
    check(response, {
        "status is 200": (r) => r.status === 200,
        "is correct message:": (r) => r.body === "Servidor no ar"
    });
}

export function checkCreate(response) {
    check(response, {
        "status is 201": (r) => r.status === 201
    });
}

export function checkListarPorId(response) {
    const checkReturn = check(response, {
        "status is 200": (r) => r.status === 200,
        "is correct user": (r) => r.json().id === 234,
        "is correct cpf": (r) => r.json().cpf === "90451718054"
    });

    return checkReturn
}

export function checkError(response, statusCodeError) {
    const checkReturn = check(response, {
        "status is Error": (r) => r.status === statusCodeError,
        "is correct user is": (r) => r.json().id === 234
    });

    return checkReturn
}