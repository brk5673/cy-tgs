/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[pantalla inicial <init>] status 200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/init',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('entidadesLegales').not.to.be.empty
            expect(response.body).to.have.property('entrega').not.to.be.empty
            expect(response.body).to.have.property('recepcion').not.to.be.empty
        })
    })

    it('[status programacion] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/status-programacion',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('dia')
            expect(response.body).to.have.property('estado')
            expect(response.body).to.have.property('programacionFinalizada')
            expect(response.body).to.have.property('usuario')
        })
    })



})