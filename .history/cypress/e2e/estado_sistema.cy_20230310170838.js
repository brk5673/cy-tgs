describe('Manu, pantalla, carga inicial', () => {
    it('habilitacion de acceso', () => {
        cy.visit('http://10.1.11.237:8080/etgs/login')
        cy.request('https://example.com').then((response) => {
            expect(response.status).to.eq(200)
        })
    })
