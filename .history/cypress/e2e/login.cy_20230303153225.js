
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
     // expect(response.headers).to.have.property('set-cookie').to.contain('JSESSIONID')
    })
  })
})

describe('Verificar Set-Cookie con JSESSIONID', () => {
  it('Verificar Set-Cookie en encabezados de respuesta', () => {
    cy.request('http://ejemplo.com/api/data').then((response) => {
      // Verificar si la respuesta contiene el encabezado 'Set-Cookie'
      expect(response.headers).to.have.property('set-cookie');

      // Obtener el valor del encabezado 'Set-Cookie'
      const setCookieHeader = response.headers['set-cookie'];

      // Verificar si el valor del encabezado 'Set-Cookie' contiene 'JSESSIONID'
      expect(setCookieHeader).to.contain('JSESSIONID');
    });
  });
});
