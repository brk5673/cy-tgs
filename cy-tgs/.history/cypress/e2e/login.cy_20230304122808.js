describe('login test', () => {
  it('login success with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: 'http://10.1.11.237:8080/etgs/api/user/login',
      headers:{
        accept: '*/*'
      },
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
      
      cy.wait(8000)
      cy.getAllCookies().then(cookies=>{
        console.log(cookies)
      })
      cy.getCookie('JSESSIONID').then(cookie_value=>{
        console.log(cookie_value)
      })
      
    })
    
  })
})