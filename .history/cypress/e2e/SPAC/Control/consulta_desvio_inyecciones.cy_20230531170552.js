
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
    cy.contains('span.MuiListItemText-primary', 'Consulta de Desvio de Inyecciones').click({force:true})
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

  it('us1081 - Validar listado desvio inyecciones', () => {
    // dirigirse al punto Consulta Desvio Inyecciones
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/desvio-inyeccion')
    cy.get('#navPath').contains('Consulta de Desvio de Inyecciones', {matchCase: false}).should('exist') // validar nombre el headers
    cy.get('input[name=fechaInicial]').clear().type('01052020') // click on initial date
    cy.get('input[name=fechaFinal]').clear().type('01052020') // click on final date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(3).click().clear().type('1800')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text').click()
    cy.wait(10000)
    
    cy.get('.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiDialog-paperFullWidth.MuiPaper-elevation24.MuiPaper-rounded')
      .should('exist').contains('error', {matchCase: false})
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary').contains('aceptar', {matchCase: false}).click()

    //validate list exist
    cy.get('.MuiTypography-root.jss68.MuiTypography-h6').contains('Desvío de Inyección por Operador Relacionado').should('exist')
    cy.get('.MuiTab-wrapper').contains('GASODUCTO: Cerri').should('exist')
    cy.get('.MuiTab-wrapper').contains('GASODUCTO: Neuba I').should('exist')
    cy.get('.MuiTab-wrapper').contains('GASODUCTO: Neuba II').should('exist')
    cy.get('.MuiTab-wrapper').contains('GASODUCTO: Sur').should('exist')
    cy.get('.MuiTab-wrapper').contains('GASODUCTO: Zonales Huincul').should('exist')
    cy.get('.MuiGrid-root.tabs_container.MuiGrid-container.MuiGrid-direction-xs-column')
      .contains('TOTALES').should('exist')
    cy.contains('TOTALES GASODUCTOS', {matchCase: false}).should('exist')

    //validate list not exist when change the date
    cy.get('.MuiCollapse-root.MuiCollapse-entered').eq(0).click() // clear inicial date
    cy.contains('Desvío de Inyección por Operador Relacionado').should('not.exist')


  })
  it.only('us1081 - Validar listado desvio inyecciones', () => {


})
