const quotation = (data) => {
    return parseFloat(data.cotacao).toFixed(2)
}

const amount = (data) => {
    return parseFloat(data.quantidade).toFixed(2)
}

const total = (num1, num2) => {
    return (num1 * num2).toFixed(2)
}

module.exports = {
    quotation,
    amount,
    total
}