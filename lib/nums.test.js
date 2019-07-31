const nums = require('./nums')

test('quotation', () => {
    expect(nums.quotation({cotacao: '3'})).toBe('3.00')
    expect(nums.quotation({cotacao: '0'})).toBe('0.00')
    expect(nums.quotation({cotacao: 100})).toBe('100.00')
})

test('amount', () => {
    expect(nums.amount({quantidade: '3'})).toBe('3.00')
    expect(nums.amount({quantidade: '0'})).toBe('0.00')
    expect(nums.amount({quantidade: 100})).toBe('100.00')
})

test('total', () => {
    expect(nums.total(3,3)).toBe('9.00')
    expect(nums.total(0,100)).toBe('0.00')
    expect(nums.total('1','1000')).toBe('1000.00')
})
