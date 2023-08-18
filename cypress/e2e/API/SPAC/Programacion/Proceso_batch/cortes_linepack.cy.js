/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[pantalla inicial <fecha actual>] status 200 & properties', () => {
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

    it('[listar <17Ago>] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/cortes-line-pack/?fecha=2023-08-17'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            //expect response body not contain html tag
            expect(response.headers['content-type']).not.to.include('text/html');

        })
    })

    it('[listar <url bad request>] st 4xx', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/corteXXs-line-pack/?fecha=2023-08-17'
        })
        .then((response) => {
            expect(response.status).not.to.eq(200)
            // expect response body exist and not contain html tag
            expect(response.headers['content-type']).not.to.include('text/html');


        })
    })
    
})