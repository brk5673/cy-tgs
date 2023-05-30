import {USERNAME, PASSWORD} from "../fixtures/credentials"



describe('Test cases de modulo Estado de Sistema', () => { // corregir describe
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
      .type(USERNAME)
    cy.get('input[name="password"]')
      .type(PASSWORD)
    cy.get('button[type="submit"]')
      .click()
  })

  it('us830 - Validar usuario con acceso y pantalla inicial de <Estado del sistema>', () => {
    cy.visit('http://10.1.11.237:8080/etgs/')
    cy.contains('span.MuiListItemText-primary', 'SPAC')
      .click()
    cy.contains('span.MuiListItemText-primary', 'Control')
      .click()
    cy.contains('span.MuiListItemText-primary', 'Estado del Sistema')
      .click()
    cy.url()
      .should('eq', 'http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.get('#navPath')
      .contains('Estado del Sistema', {matchCase: false})
      .should('exist')
    cy.log('Visualizar el boton "Listar"')
    cy.contains('Listar')
      .should('exist')

    cy.contains('Listar')
      .should('exist').click()
    cy.get('div.HeaderSvgCustomIcon.PdfIcon')
      .should('be.visible')
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon')
      .should('be.visible')
    cy.get('path').eq(0)
      .should('be.visible')

    cy.contains('Estado del Sistema')
      .should('exist')
    
    cy.get('[name="inicial"]').clear().type('01011990')
      cy.get('[name="inicial"][value="01/01/1990"]').should('exist')
    cy.get('[name="final"]').clear().type('31122099')
      cy.get('[name="final"][value="31/12/2099"]').should('exist')

      cy.get('path').eq(20).click({force:true})
      cy.get('path').eq(21).click({force:true})
      cy.get('div.MuiPickersBasePicker-container').should('be.visible')
  })

  it('us831 - validar funcionamiento boton "Listar" y datos, botones y leyenda de tabla', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
      cy.get('#navPath').should('contain.text', 'Estado del Sistema', {matchCase: false})
    cy.contains('Listar').click()
    cy.get('.MuiTab-wrapper').should('contain.text', 'Estado del Sistema', {matchCase: false})
    cy.get('.MuiPaper-root.tables.MuiPaper-elevation0.MuiPaper-rounded').should('exist')
      .should('contain.text', 'Fecha')
      .should('contain.text', 'N')
      .should('contain.text', 'Estado')
      .should('contain.text', 'CMD')
      .should('contain.text', '%')
      .should('contain.text', 'Entidad legal')
      .should('contain.text', 'Abreviatura')
      .should('contain.text', 'Observaciones')
      .should('contain.text', 'Eliminar')
      cy.get('.MuiButton-label').should('contain.text', 'Enviar notificación')
      cy.get('.MuiButton-label').should('contain.text', 'Agregar Nuevo')
  })

  it('us832 - Validacion exportar Excel', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
      cy.get('#navPath').should('contain.text', 'Estado del Sistema', {matchCase: false})
    cy.get('[name="inicial"]').clear().type('16032023')
    cy.get('[name="final"]').clear().type('16032023')
    cy.contains('Listar').click()
    cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeSmall').should('exist')
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon').should('be.visible').click()
    // falta validar la descarga del doc .xls
  })

  it('us833 - Validacion exportar PDF', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
      cy.get('#navPath').should('contain.text', 'Estado del Sistema', {matchCase: false})
    cy.get('[name="inicial"]').clear().type('16032023')
    cy.get('[name="final"]').clear().type('16032023')
    cy.contains('Listar').click()
    cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeSmall').should('exist')
    cy.get('div.HeaderSvgCustomIcon.PdfIcon').should('be.visible').click()
    // falta validar descargar del pdf
  })

  it('us834 - Validacion de Imprimir PDF', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
      cy.get('#navPath').should('contain.text', 'Estado del Sistema', {matchCase: false})
    cy.get('[name="inicial"]').clear().type('16032023')
    cy.get('[name="final"]').clear().type('16032023')
    cy.contains('Listar').click()
    cy.get('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeSmall').should('exist')
    cy.get('div.HeaderSvgCustomIcon.PdfIcon').should('be.visible').click()

})