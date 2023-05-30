import {USERNAME, PASSWORD} from "../fixtures/credentials"

describe('Manu, pantalla, carga inicial', () => {
  beforeA(() => {
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
    cy.contains('span.MuiListItemText-primary', 'Estados del Sistema')
      .click()
    cy.url()
      .should('eq', 'http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Estado del Sistema')
      .should('exist')
    cy.log('Visualizar el boton "Listar"')
    cy.contains('Listar')
      .should('exist')
  })

  it('Validar botones "Imprimir", "Descargar PDF", "Descargar Excel"', () => {
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

  it('Validar datepickers', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Estado del Sistema')
      .should('exist')
      cy.get('/html/body/div[1]/div/div/main/div/div[1]/div/div[2]/div/div/div/div/div/div[1]/div[1]/div/div/div[2]/button/span[1]/svg/path[1]')
        .should('be.visible')
        .click()

  })
})