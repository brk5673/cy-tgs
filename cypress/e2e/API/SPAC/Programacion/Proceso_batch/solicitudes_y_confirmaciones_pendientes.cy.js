/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Contratos con Corte a la Entrega> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[pantalla inicial <current day>] status 200 & properties', () => {
        
        // print cy.today
        cy.today().then((date) => {
            cy.log(date)
        
            cy.request({
                // insertar url con fecha actual
                url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('aceptarHabilitado')
                expect(response.body).to.have.property('solicitudesConfirmaciones')
            })
        })
    })



})