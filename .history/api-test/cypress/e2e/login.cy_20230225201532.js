describe('login test', () => {
  it('login success', () => {
    cy.request({
      method: 'POST',
      url: 'http://10.1.11.237:8080/etgs/login',
      body: {
        username:"jmaharbi",
        password:"BocaJuniors1_"
      }
    })
  })
})