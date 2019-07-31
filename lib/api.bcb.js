const axios = require('axios')

const getResp = (date) => axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`)

const getDate = () => {
    let data = new Date()
    return `${data.getMonth() + 1}-${data.getDate()}-${data.getFullYear()}`
}

const getQuotation = ({getDate, getResp}) => async() => {
    try {
        const today    = getDate()
        const response = await getResp(today)
        return response.data.value.length === 0 ? '' : response.data.value[0].cotacaoVenda.toFixed(2)
    } catch(err) {
        return ''
    }
}

module.exports = {
    getResp,
    getDate,
    getQuotation: getQuotation({ getDate, getResp }),
    pure: {
        getQuotation
    }
}

