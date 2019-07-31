const Joi        = require('@hapi/joi')
const nums       = require('../lib/nums')
const validation = require('../lib/validation')

const validationSchema = Joi.object().keys({
    cotacao: Joi.number().min(1).max(10),
    quantidade: Joi.number().min(1)
})

const convertido = (req, res) => {
    try {
        const value      = validation(req.query, validationSchema)
        const cotacao    = nums.quotation(value)
        const quantidade = nums.amount(value)
        const total      = nums.total(cotacao, quantidade)
        res.render('convertido', {cotacao, quantidade, total})
    } catch (err) {
        const { cotacao, quantidade } = req.query
        res.render('index', {cotacao, quantidade, err})
    }
}

module.exports = convertido