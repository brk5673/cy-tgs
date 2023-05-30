describe('login test', () => {
  it('login success with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: 'http://10.1.11.237:8080/etgs/api/user/login',
      body: {
        username:"jmaharbi",
        password:"BocaJuniors1_"
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers).to.have.property('set-cookie')
      cy.getCookie('JSESSIONID').then(valueCookie=> )
      //.should('exist')
    })
    
  })
})