import {USERNAME, PASSWORD, USERNAME1, PASSWORD1, USER1, PASS1} from "../../../../../fixtures/credentials"

describe('Test cases de modulo <SPAC/Mantenimiento/Desvio de inyecciones/Configuracion de contactos>', () => {
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
      .type(USER1)
    cy.get('input[name="password"]')
      .type(PASS1)
    cy.get('button[type="submit"]')
      .click()
    cy.wait(2000)
  })

  it('us1120 - Validacion del menu, pantalla y carga inicial', () => {
    //dirigirse al punto configContactos por UI
    cy.visit('http://10.1.11.237:8080/etgs/')
    cy.contains('span.MuiListItemText-primary', 'SPAC').click()
    cy.contains('span.MuiListItemText-primary', 'Mantenimiento').click()
    cy.contains('span.MuiListItemText-primary', 'Desvío de Inyección').click()
    cy.contains('span.MuiListItemText-primary', 'Configuración de Contactos').click()
    cy.wait(500)
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
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')  // dirigirse al punto configContactos
    cy.get('#navPath').contains('Configuracion de Contactos', {matchCase: false}).should('exist') // validar nombre el headers

    // usar los filtros y corroborar los datos obtenidos
    cy.get('input[name="nombreGasoducto"]').type('Neuba II')
    cy.get('table').contains('td', 'Neuba II').should('exist')
    cy.get('input[name="nombreEntidadLegal"]').type('YPF S.A.')
    cy.get('table').contains('td', 'YPF S.A.').should('exist')
    cy.get('input[name="nombre"]').type('Javier Val')
    cy.get('table').contains('td', 'Javier Val').should('exist')
  })

  it('us1126 - Validar accion "Agregar nuevo"', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')  // dirigirse al punto configContactos
    cy.get('#navPath').contains('Configuracion de Contactos', {matchCase: false}).should('exist') // validar nombre el headers
    cy.wait(1000)
    // agregar nuevo contacto
    cy.contains('Agregar Nuevo').click()

    cy.get(':nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root').click().type('TF - Troncal{enter}')
    cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root').click().type('CINERGIA{enter}')
    cy.get('#name').click().type('Messi{enter}')
    cy.get('#mail').click().type('pruebas@messi.com{enter}')
    cy.contains('Aceptar').click()
    cy.wait(200)

    cy.get('input[name="nombre"]').type('Mess')
    cy.contains('Messi').should('exist')

    cy.get('.actionBars > :nth-child(1) > .MuiButton-label').click()
    cy.get('#message-id').should('exist')
  })

  it('us1127 - Validar editar contacto', () => {
    let counter = 1

    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos') // go to configContact page
    cy.get('#navPath').contains('Configuracion de Contactos', {matchCase: false}).should('exist') // validate headers name
    cy.wait(1000)

    cy.get('.MuiTableBody-root.tables_body') // pick table
      .find('tr:first-child > :nth-child(6)') // pick 1st row & 6th column on table
      .find('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeSmall') // select edit button
      .should('exist').click({force: true})    

    //edith 1st data on table for 1st time
    cy.get('#name').clear().each(($input) => {
      const textToType = `cy test ${counter}`
      cy.wrap($input).type(textToType)
      counter++
      cy.contains('Aceptar').click({force: true})
    //edit 1st data on table for 2th time
    
      cy.get('.MuiTableBody-root.tables_body') // pick table
      .find('tr:first-child > :nth-child(6)') //pick 1st row & 6th column on table
      .find('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeSmall') // select edit button
      .should('exist').click({force: true})    
      cy.get('#name').clear().each(($input) => {
        const textToType = `cy test ${counter}`
        cy.wrap($input).type(textToType)
        counter++
      })
    })
    cy.contains('span.MuiButton-label', 'Aceptar').click();
    cy.wait(500)
    cy.get('.MuiTableBody-root.tables_body') // pick table
      .contains('test') // pick 1st row on table

    cy.get('.actionBars > :nth-child(1) > .MuiButton-label').click() // select 'grabar' button on footer
    cy.get('#message-id').should('exist')
    
  })

  it('us1128 - validar eliminar contacto', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos') // go to configContact page
    cy.wait(1000)
    cy.get('#navPath').contains('Configuracion de Contactos', {matchCase: false}).should('exist') // validate headers name

    cy.contains('test').should('exist') // check exist the 'test' name in table
    cy.get('.MuiTableBody-root.tables_body') // pick table
      .find('tr:first-child > :nth-child(7)') // pick 1st row & 7th column on table
      .find('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeSmall') 
        .should('exist').click({force: true}) // find & click on delete button
    cy.on('window:confirm', () => {
      return true
    })
    cy.contains('test').should('not.exist') // check not exist the 'test' name in table
  })
  
  it('us1140 - validar exportar reportes (.xls/.pdf/print)', () => {
    // go to configContact page
    cy.visit('http://10.1.11.237:8080/etgs/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos')
    cy.get('#navPath').contains('Configuracion de Contactos', {matchCase: false}).should('exist') // validate headers name
    cy.wait(2000)
    
    cy.get('div.HeaderSvgCustomIcon.PdfIcon').should('be.visible').click() // click on pdf button
    cy.readFile('cypress/downloads/contactosDesvioDeInyeccion.pdf').should('exist') // .pdf doc download correctly

    cy.get('div.HeaderSvgCustomIcon.ExcelIcon').should('be.visible').click() // click on excel button
    cy.readFile('cypress/downloads/contactosDesvioDeInyeccion.xls').should('exist') // .xls doc download correctly

    cy.get('path').eq(0).click() //click on print button
    cy.window().should('have.property', 'open') // verify then you have the windows open 
    
  })

})  