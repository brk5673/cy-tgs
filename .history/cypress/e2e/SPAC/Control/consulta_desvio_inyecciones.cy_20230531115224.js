
describe('Test cases de modulo <SPAC/Control/Consulta de Desvio de Inyecciones>', () => {
  beforeEach(() => {
    cy.visit('http://10.1.11.237:8080/etgs/login')
    cy.url()
      .should('eq', 'http://10.1.11.237:8080/etgs/login')
    cy.get('input[name="userName"]')
      .should('be.visible')
    cy.get('.logotgs')
      .should('exist')
      .and('be.visible')

    cy.get('input[name="userName"]')
      .type('gpalladi')
    cy.get('input[name="password"]')
      .type('Independiente1_')
    cy.get('button[type="submit"]')
      .click()
    cy.wait(2000)
  })

  it('us1080 - Validacion del menu, pantalla y carga inicial', () => {
    // dirigirse al punto Consulta Desvio Inyecciones por UI
    cy.visit('http://10.1.11.237:8080/etgs/')
    cy.contains('span.MuiListItemText-primary', 'SPAC').click()
    cy.contains('span.MuiListItemText-primary', 'Control').click()
    cy.contains('span.MuiListItemText-primary', 'Consulta de Desvio de Inyecciones').click()
    cy.wait(1000)
  
    // validate web elements
    cy.get('#navPath').contains('Consulta de Desvio de Inyecciones', {matchCase: false}).should('exist') // validar nombre el headers
    cy.get('input[name=fechaInicial]').clear().type('01011990') // click on initial date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(1).click().clear().type('0530')
    cy.get('input[name=fechaFinal]').clear().type('31122099') // click on final date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(3).click().clear().type('1830')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text').click()

    cy.wait(10000)

    cy.contains('Desvío de Inyección por Operador Relacionado').should('exist')
  })

  it.only('us1081 - Validar listado desvio inyecciones', () => {
    // dirigirse al punto Consulta Desvio Inyecciones
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/desvio-inyeccion')
    cy.get('#navPath').contains('Consulta de Desvio de Inyecciones', {matchCase: false}).should('exist') // validar nombre el headers
    cy.get('input[name=fechaInicial]').clear().type('01052023') // click on initial date
    cy.get('input[name=fechaFinal]').clear().type('01052023') // click on final date



  })

})
