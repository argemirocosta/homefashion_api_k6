import * as config from './config.js'

export function montarUrl(path) {
    if (config.ENV == "prod") {
        return `${config.SERVER_PROD_URL}${path}`
    } else {
        return `${config.SERVER_DEV_URL}${path}`
    }
}