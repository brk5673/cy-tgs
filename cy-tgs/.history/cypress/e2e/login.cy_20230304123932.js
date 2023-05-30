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
      //siguiente seria verificar que esta set cookie contiene el string "JSESSIONID" 

      //verificar que despues del JSESSIONID hay un "=" y el valor que sigue no es nulo
      
      cy.getAllCookies().then(cookies=>{
        const token_cookie = cookies[0];
        expect(token_cookie).to.have.property('name').eq('JSESSIONID');
        expect(token_cookie).to.have.property('value').to.have.length.of.at.most(30)

      })
    })
    
  })
})