import {USERNAME, PASSWORD, USERNAME1, PASSWORD1} from "../../../../fixtures/credentials"

describe('Test cases de modulo <SPAC/Mantenimiento/Desvio de inyecciones/Configuracion de contactos>', () => { // corregir describe
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

  it.only('us1120 - Validacion del menu, pantalla y carga inicial', () => {
    //dirigirse al punto configContactos por UI
    cy.visit('http://10.1.11.237:8080/etgs/')
    cy.contains('span.MuiListItemText-primary', 'SPAC').click()
    cy.contains('span.MuiListItemText-primary', 'Mantenimiento').click()
    cy.contains('span.MuiListItemText-primary', 'Desvío de Inyección').click()
    cy.contains('span.MuiListItemText-primary', 'Configuración de Contactos').click()
  
    // dirigirse a la pagina y validar el titulo en el headers
    cy.get('#navPath').contains('Configuracion de Contactos', {matchCase: false}).should('exist') // validar nombre el headers
    
    // valiar textBoxes de filtro
    cy.contains('Gasoducto:').should('exist')
    cy.contains('Entidad Legal:').should('exist')
    cy.contains('Contacto:').should('exist')

    // validar columnas de la grilla
    cy.get('table').contains('th', 'Gasoducto').should('exist')
    cy.get('table').contains('th', 'Nro').should('exist')
    cy.get('table').contains('th', 'Entidad Legal').should('exist')
    cy.get('table').contains('th', 'Contacto').should('exist')
    cy.get('table').contains('th', 'Mail').should('exist')
    cy.get('table').contains('th', 'Sin MAPO (Exceso de inyeccion)').should('exist')
    cy.get('table').contains('th', 'Con MAPO (Exceso de inyeccion)').should('exist')
    cy.get('table').contains('th', 'Deficit de Inyeccion').should('exist')

    //exportar grilla
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon')
  .click();



  })

  it('us1123 - Validacion filtros <Gasoducto/Entidad_Legal/Contacto>', () => {
    // dirigirse al punto configContactos
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')
    // usar los filtros y corroborar los datos obtenidos
    cy.get('input[name="nombreGasoducto"]').type('Neuba II')
    cy.get('input[name="nombreEntidadLegal"]').type('YPF S.A.')
    cy.get('input[name="nombre"]').type('Javier Val')
    cy.get('button[type="submit"]').click()
    cy.get('table').contains('td', 'GASODUCTO 1').should('exist')
    cy.get('table').contains('td', 'ENTIDAD LEGAL 1').should('exist')
    cy.get('table').contains('td', 'CONTACTO 1').should('exist')
    
  })

  it('us1127 - Validar la edicion de contactos existentes', () => {
  // dirigirse al punto configContactos
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')
  // editar un contacto existente
    cy.get('table').contains('td', 'GASODUCTO 1').should('exist')
    cy.get('table').contains('td', 'ENTIDAD LEGAL 1').should('exist')
    cy.get('table').contains('td', 'CONTACTO 1').should('exist')
    cy.get('table').contains('td', 'GASODUCTO 1').parent().contains('button', 'Editar').click()
    
      
  })
  


})  