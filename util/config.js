import encoding from "k6/encoding";

export let SERVER_DEV_URL = "http://localhost:8080"
export let SERVER_PROD_URL = "http://localhost:8080a"
export let USER_AUTH = "usuario1"
export let PASSWORD_AUTH = "senha1"
export let ENV = "prod"


export function montarUrl(path) {
    if (ENV == "prod") {
        return `${SERVER_PROD_URL}${path}`
    } else {
        return `${SERVER_DEV_URL}${path}`
    }
}

export function montarHeadersApenasComBasicAuth() {
    const credentials = `${USER_AUTH}:${PASSWORD_AUTH}`;
    return {headers: {"Authorization": "Basic " + encoding.b64encode(credentials)}}
}