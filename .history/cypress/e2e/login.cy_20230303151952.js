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
      expect(response.headers).to.have.property('set-cookie').to.include('JSESSIONID[0]')
      .then((response) => {
        token = response.body.token;
      });
    });
  
    it('Validar si el token es válido', () => {
      // Hacer una llamada a la API utilizando el token
      cy.request({
        method: 'GET',
        url: 'http://example.com/api/data',
        headers: {
          Authorization: `Bearer ${token}`
        }
      //const response_header = response.headers['set-cookie'].split(';')[0]
    })
    
  })
})