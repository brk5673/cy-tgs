
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
      .type('dsad')
    cy.get('button[type="submit"]')
      .click()
    cy.wait(200)
  })

  it.only('us1080 - Validacion del menu, pantalla y carga inicial', () => {
    // dirigirse al punto Consulta Desvio Inyecciones por UI
    cy.visit('http://10.1.11.237:8080/etgs/')
    cy.contains('span.MuiListItemText-primary', 'SPAC').click()
    cy.contains('span.MuiListItemText-primary', 'Control').click()
    cy.contains('span.MuiListItemText-primary', 'Consulta de Desvio de Inyecciones').click()
  
    // validate web elements
    cy.get('#navPath').contains('Consulta de Desvio de Inyecciones', {matchCase: false}).should('exist') // validar nombre el headers
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd[0]').click() // click on initial date
        .type('01011990')
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd[1]').click() // click on final date
        .type('31122099')
    cy.get('.MuiGrid-root').click() // click on search button
  })
})