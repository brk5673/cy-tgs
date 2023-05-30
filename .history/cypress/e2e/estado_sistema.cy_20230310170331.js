describe('Manu, pantalla, carga inicial', () => {
    it('habilitacion de acceso', () => {
        cy.visit('http://10.1.11.237:8080/etgs/login')
        'cy.get('.MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart').click();
    })
})