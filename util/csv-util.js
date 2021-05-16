import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {SharedArray} from "k6/data";

export function pegarDadoDaMassa(caminhoArquivo) {
    return pegarLinhaAleatoriaDoCsv(prepararMassaCsv(caminhoArquivo))
}

function prepararMassaCsv(caminhoArquivo) {
    const csvData = new SharedArray("data from csv file", function () {
        return papaparse.parse(open('../../resources/usuario/./usuario-adicionar.csv'),
            {header: true}).data;
    })

    return csvData
}

function pegarLinhaAleatoriaDoCsv(csvData){
    return csvData[Math.floor(Math.random() * csvData.length)]
}