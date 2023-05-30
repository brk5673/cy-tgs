import {USERNAME, PASSWORD} from "../fixtures/credentials"

describe('Manu, pantalla, carga inicial', () => {
  it('habilitacion de acceso', () => {
    cy.visit('http://10.1.11.237:8080/etgs/login')
    cy.url().should('eq', 'http://10.1.11.237:8080/etgs/login')
    cy.get('input[name="userName"]').should('be.visible')
    cy.get('.logotgs')
      .should('exist')
      .and('be.visible')

    cy.get('input[name="userName"]').type(USERNAME)
    cy.get('input[name="password"]').type(PASSWORD)
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://10.1.11.237:8080/etgs/'


    cy.contains('span.MuiListItemText-primary', 'SPAC').click()
    cy.contains('span.MuiListItemText-primary', 'Control').click()
    cy.contains('span.MuiListItemText-primary', 'Estados del Sistema').click()
  })
})

/* describe('Login Test', () => {
    it('Visits the login page and logs in', () => {
      // Visitar la página de login
      cy.visit('http://10.1.11.237:8080/etgs/login')
  
      // Ingresa las credenciales de usuario y contraseña
      cy.get('input[name="username"]').type('tu-usuario')
      cy.get('input[name="password"]').type('tu-contraseña')
  
      // Hacer clic en el botón de iniciar sesión
      cy.get('button[type="submit"]').click()
    })
}) */