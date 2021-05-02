import encoding from "k6/encoding";
import * as config from './config.js'

export function montarHeadersApenasComBasicAuth() {
    const credentials = `${config.USER_AUTH}:${config.PASSWORD_AUTH}`;
    return {headers: {"Authorization": "Basic " + encoding.b64encode(credentials)}}
}