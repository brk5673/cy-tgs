/// <reference types="cypress"/>


describe('API tests module View Parametrizada', () => {  
    beforeEach(() => {
     cy.loginAPI('gpalladi', 'Independiente1_')
    })
    
    it('init - pantalla inicial', () => {
        cy.get('@jsession').then(token => {
            console.log(token)
            cy.request({
                method: 'GET',
                url: 'http://10.1.11.237:8080/etgs/api/spac/control/viewparametrizada/init',
                headers: {
                    Cookie: `JSESSIONID=ow3_8oQlF0371aNiVh0qc7-fTidAmjMZ5PWT3Vac.tgsdbwildfly04`
                }
            }).then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200);
            })
        })  
        
    })
})

/* curl "http://10.1.11.237:8080/etgs/api/spac/control/viewparametrizada/init" ^
  -H "Accept: application/json, text/plain, */
//  -H "Accept-Language: es-ES,es;q=0.9,en;q=0.8" ^
 // -H "Connection: keep-alive" ^
//  -H "Cookie: JSESSIONID=ow3_8oQlF0371aNiVh0qc7-fTidAmjMZ5PWT3Vac.tgsdbwildfly04" ^
 // -H "Referer: http://10.1.11.237:8080/etgs/spac/control/viewparametrizada" ^
//  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" ^
 // --compressed ^
 // --insecure */

//  JSESSIONID=nidZzrHG94Hw6T7uqRwyf4oGVrNraj8rhAzStvqU.tgsdbwildfly04
//  JSESSIONID=nidZzrHG94Hw6T7uqRwyf4oGVrNraj8rhAzStvqU.tgsdbwildfly04 