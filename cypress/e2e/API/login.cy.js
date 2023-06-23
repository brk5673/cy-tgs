//import { USERNAME, PASSWORD } from "../fixtures/credentials"

import { PASS1, PASSWORD1, USER1, USERNAME, USERNAME1 } from "../../fixtures/credentials"

describe('login test', () => {
  it('login exitoso con credenciales validas', () => {
    cy.request({
      method: 'POST',
      url: 'http://10.1.11.236:8080/etgs/api/user/login',
      body: {
        username:USER1,
        password:PASS1
      }
    })
    .then((response) => {
      expect(response.status, 'verificar status code 200').to.eq(200)
      expect(response.headers, 'verificar el setup de la cookie').to.have.property('set-cookie')
      //siguiente seria verificar que esta set cookie contiene el string "JSESSIONID" 

      //verificar que despues del JSESSIONID hay un "=" y el valor que sigue no es nulo
      
      cy.getAllCookies().then(cookies=>{
        const token_cookie = cookies[0];
        expect(token_cookie, 'verificar existencia de un token de nombre').to.have.property('name').eq('JSESSIONID', 'que sea igual a JSEESIONID');
        expect(token_cookie, 'verificar longitud deL token').to.have.property('value').to.have.length.of.at.least(30)

      })
    })
    
  })
})