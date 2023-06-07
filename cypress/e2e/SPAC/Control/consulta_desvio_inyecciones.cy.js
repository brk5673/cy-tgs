import {USERNAME, PASSWORD, USERNAME1, PASSWORD1} from "../../../fixtures/credentials"

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
      .type(USERNAME)
    cy.get('input[name="password"]')
      .type(PASSWORD)
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
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(1).click().clear().type('0500')
    cy.get('input[name=fechaFinal]').clear().type('31122099') // click on final date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(3).click().clear().type('1800')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text').click()

    cy.wait(2000)

    cy.contains('Desvío de Inyección por Operador Relacionado').should('exist')
  })

  it('us1081 - Validar listado desvio inyecciones', () => {
    // dirigirse al punto Consulta Desvio Inyecciones
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/desvio-inyeccion')
    cy.get('#navPath').contains('Consulta de Desvio de Inyecciones', {matchCase: false}).should('exist') // validar nombre el headers

    // to list data on list
    cy.get('input[name=fechaInicial]').clear().type('01052020') // click on initial date
    cy.get('input[name=fechaFinal]').clear().type('01052020') // click on final date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(3).click().clear().type('1800')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text').click()
    cy.wait(10000)
    
    // interact with error modal
    cy.get('.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiDialog-paperFullWidth.MuiPaper-elevation24.MuiPaper-rounded')
      .should('exist').contains('error', {matchCase: false})
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary').contains('aceptar', {matchCase: false}).click() // click on accept button

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

  it.only('us1102 - Validar enviar nota', () => {
    // dirigirse al punto Consulta Desvio Inyecciones
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/desvio-inyeccion')
    cy.get('#navPath').contains('Consulta de Desvio de Inyecciones', {matchCase: false}).should('exist') // validate header's name

    // to list data on list
    cy.get('input[name=fechaInicial]').clear().type('01052020') // click on initial date
    cy.get('input[name=fechaFinal]').clear().type('01052020') // click on final date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(3).click().clear().type('1800')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text').click()
    cy.wait(10000)

    // interact with error modal
    cy.get('.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiDialog-paperFullWidth.MuiPaper-elevation24.MuiPaper-rounded')
      .should('exist').contains('error', {matchCase: false})
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary').contains('aceptar', {matchCase: false}).click() // click on accept button

    // send <note1 SIN MAPO>
    cy.get(':nth-child(4) > .tabs_swipper > .react-swipeable-view-container > [aria-hidden="false"] > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(11) > .MuiButtonBase-root')
      .click({force:true}) // click on send <Note1 sin MAPO>
    cy.contains('DESVIO DE INYECCIÓN SIN SUPERACIÓN DE MAPO').should('exist')
    cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').click()
    cy.contains('La nota fue enviada exitosamente.').should('exist')

    // send <note2 SIN MAPO>
    cy.get(':nth-child(4) > .tabs_swipper > .react-swipeable-view-container > [aria-hidden="false"] > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(12) > .MuiButtonBase-root')
      .click({force:true}) // click on send <Note2 sin MAPO>
    cy.contains('DESVIO DE INYECCIÓN SIN SUPERACIÓN DE MAPO').should('exist')
    cy.get('#valorIngresado').type('123321')
    cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').click()
    cy.contains('La nota fue enviada exitosamente.').should('exist')

    // send <note1 CON MAPO>
    cy.get(':nth-child(4) > .tabs_swipper > .react-swipeable-view-container > [aria-hidden="false"] > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(13) > .MuiButtonBase-root')
      .click({force:true}) // click on send <Note1 con MAPO>
    cy.contains('DESVIO DE INYECCIÓN CON SUPERACIÓN DE MAPO').should('exist')
    cy.get('#valorIngresado').type('456654')
    cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').click()
    cy.contains('La nota fue enviada exitosamente.').should('exist')

    // send <note2 CON MAPO>
    cy.get(':nth-child(4) > .tabs_swipper > .react-swipeable-view-container > [aria-hidden="false"] > .MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(14) > .MuiButtonBase-root')
      .click({force:true}) // click on send <Note2 con MAPO>
    cy.contains('DESVIO DE INYECCIÓN CON SUPERACIÓN DE MAPO').should('exist')
    cy.get('.MuiDialogActions-root > :nth-child(1) > .MuiButton-label').click()
    cy.contains('La nota fue enviada exitosamente.').should('exist')

  })

  it('us1106 - Validar exportar grilla', () => {
    // dirigirse al punto Consulta Desvio Inyecciones
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/desvio-inyeccion')
    cy.get('input[name=fechaInicial]').clear().type('01052020') // click on initial date
    cy.get('input[name=fechaFinal]').clear().type('01052020') // click on final date
    cy.get('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd').eq(3).click().clear().type('1800')
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text').click()
    cy.wait(10000)
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary').contains('aceptar', {matchCase: false}).click() // click on accept button

    // download list on pdf
    cy.get('div.HeaderSvgCustomIcon.PdfIcon').should('be.visible').click().wait(2000) // click on pdf button
    cy.readFile('cypress/downloads/ConsultaDeDesvioDeInyecciones.pdf').should('exist') // .pdf doc download correctly

    // download list on excel
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon').should('be.visible').click().wait(2000) // click on excel button
    cy.readFile('cypress/downloads/ConsultaDeDesvioDeInyecciones.xls').should('exist') // .xls doc download correctly

    // print list
    cy.get('path').eq(0).click().wait(2000) // click on print button
    cy.window().should('have.property', 'open') // verify then you have the windows open 

  })



})
