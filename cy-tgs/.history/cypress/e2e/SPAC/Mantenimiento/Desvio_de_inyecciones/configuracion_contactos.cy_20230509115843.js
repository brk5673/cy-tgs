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
    cy.wait("")
  })

  it('us1120 - Validacion del menu, pantalla y carga inicial', () => {
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
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon').should('exist')
    cy.get('div.HeaderSvgCustomIcon.PdfIcon').should('exist')
    cy.get('svg.MuiSvgIcon-root.HeaderSvgCustomIcon.PrintIcon').should('exist')
  


  })

  it('us1123 - Validacion filtros <Gasoducto/Entidad_Legal/Contacto>', () => {
    // dirigirse al punto configContactos
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')
    // usar los filtros y corroborar los datos obtenidos
    cy.get('input[name="nombreGasoducto"]').type('Neuba II')
    cy.get('table').contains('td', 'Neuba II').should('exist')
    cy.get('input[name="nombreEntidadLegal"]').type('YPF S.A.')
    cy.get('table').contains('td', 'YPF S.A.').should('exist')
    cy.get('input[name="nombre"]').type('Javier Val')
    cy.get('table').contains('td', 'Javier Val').should('exist')
    
  })

  it.only('us1126 - Validar accion "Agregar nuevo"', () => {
    // dirigirse al punto configContactos
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')
    // agregar nuevo contacto
    cy.contains('Agregar Nuevo').click()
    cy.get('.MuiInputBase-input MuiInput-input-MuiAutocomplete-input-MuiAutocomplete-inputFocused-MuiInputBase-inputAdornedEnd').click()
        
  })
  


})  