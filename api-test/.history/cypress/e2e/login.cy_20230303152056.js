describe('login test', () => {
  it('login success', () => {
    cy.request({
      method: 'POST',
      url: 'http://10.1.11.237:8080/etgs/api/user/login',
      body: {
        username:"jmaharbi",
        password:"BocaJuniors1_"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers).to.have.property('
      
      //const response_header = response.headers['set-cookie'].split(';')[0]
    })
    
  })
})