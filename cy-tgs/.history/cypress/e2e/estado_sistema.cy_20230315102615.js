import {USERNAME, PASSWORD} from "../fixtures/credentials"

describe('Manu, pantalla, carga inicial', () => { // corregir describe
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

  it('Acceso a Estados de Sistema', () => {
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
      .contains('Estado de Sistema', {matchCase: false})
      .should('exist')
    cy.log('Visualizar el boton "Listar"')
    cy.contains('Listar')
      .should('exist')
  })

  it('Validar existencia botones "Imprimir", "Descargar PDF", "Descargar Excel"', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Listar')
      .should('exist')
      .click()
    cy.get('div.HeaderSvgCustomIcon.PdfIcon')
      .should('be.visible')
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon')
      .should('be.visible')
    cy.get('path').eq(0)
      .should('be.visible')
  })

  it.only('Validar datepickers', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Estado del Sistema')
      .should('exist')
    cy.get('[name=["inicial"]').clear()
    cy.get('path').eq(21) // 1st datepicker
      .should('exist').click({force: true})
    cy.get('path').eq(22) // 2nd datepicker
      .should('exist').click({force: true})


  })
})