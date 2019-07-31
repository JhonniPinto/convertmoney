const Joi = require('@hapi/joi')

const validate = (data, schema) => {
    const { error, value } = Joi.validate(data, schema, { abortEarly: false, stripUnknown: true })
    if (error) {
        const err = error.details.map(erro => erro.path.toString())
        throw err
    } else {
        return value
    }
}

module.exports = validate