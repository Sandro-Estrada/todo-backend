describe('index', () => {
  it('success', async () => {
    const index = require('../../models')
    expect(index).toHaveProperty('todos')
  })
})
