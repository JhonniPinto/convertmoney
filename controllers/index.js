const apiBCB = require('../lib/api.bcb')

const index = async(req, res) => {
    const cotacao = await apiBCB.getQuotation()
    res.render('index', { cotacao, quantidade: false , err: false })
}

module.exports = index