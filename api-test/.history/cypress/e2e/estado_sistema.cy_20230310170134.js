describe('Manu, pantalla, carga inicial', () => {
    it('habilitacion de acceso', () => {
        cy.visit('http://10.1.11.237:8080/etgs/login')
        cy.get('cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input')')
    })
})