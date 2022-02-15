const sum = (n1: number, n2: number) => n1 + n2

describe('Sum function', () => {
  it('should return 4 when sum is called with 2 and 2', () => {
    const n1 = 3
    const n2 = 3


    expect(sum(n1, n2)).toEqual(6)
  })
})