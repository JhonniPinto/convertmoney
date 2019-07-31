const apiBCB = require('./api.bcb')
const axios  = require('axios')

jest.mock('axios')

test('getResp', async() => {
    const res = { data: { value: [ { cotacaoVenda: 3.90 } ] } }
    axios.get.mockResolvedValue(res)
    const resp = await apiBCB.getResp('01-01-2019')
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2701-01-2019%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

describe('getDate', () => {
    const realDate = Date

    function mockDate(date) {
        global.Date = class extends realDate {
            constructor() {
                return new realDate(date)
            }
        }
    }
    mockDate('2019-01-01T12:00:00z')
    
    afterEach(() => {
        global.Date = realDate
    })
    
    test('getDate', () => {
      const today = apiBCB.getDate()
      expect(today).toBe('1-1-2019')
    })
})

test('getQuotation', async() => {
    const res = { data: { value: [ { cotacaoVenda: 3.90 } ] } }

    const getDate = jest.fn()
    getDate.mockReturnValue('1-1-2019')

    const getResp = jest.fn()
    getResp.mockResolvedValue(res)
    
    const cotacao = await apiBCB.pure.getQuotation({getDate, getResp})()
    expect(cotacao).toBe('3.90')
})

test('getQuotation', async() => {
    const res = {}

    const getDate = jest.fn()
    getDate.mockReturnValue('1-1-2019')

    const getResp = jest.fn()
    getResp.mockResolvedValue(res)
    
    const cotacao = await apiBCB.pure.getQuotation({getDate, getResp})()
    expect(cotacao).toBe('')
})

test('getQuotationCatch', async() => {
    const res = { data: { value: [ { cotacaoVenda: 3.90 } ] } }

    const getDate = jest.fn()
    getDate.mockReturnValue('1-1-2019')

    const getResp = jest.fn()
    getResp.mockReturnValue(Promise.reject('err'))
    

    const cotacao = await apiBCB.pure.getQuotation({getDate, getResp})()
    expect(cotacao).toBe('')
})