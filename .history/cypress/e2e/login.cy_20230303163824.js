describe('login test', () => {
  it('login success with valid credentials', () => {
    cy.request({
      method: 'POST',
      headers: 
      url: 'http://10.1.11.237:8080/etgs/api/user/login',
      body: {
        username:"jmaharbi",
        password:"BocaJuniors1_"
      }
    })
    .then((response) => {
      cy.wait(4000)
      expect(response.status).to.eq(200)
      expect(response.headers).to.have.property('set-cookie')
  
    })
    
  })
})