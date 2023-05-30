describe('Manu, pantalla, carga inicial', () => {
    it('habilitacion de acceso', () => {
        cy.visit('http://10.1.11.237:8080/etgs/login')
            expect(response.status, 'verificar status code 200').to.eq(200)
        //cy.get('.MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart').click();
    })
})