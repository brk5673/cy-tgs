/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    // list test case

    it('[process status] status code 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2022-07-03', // lis endpoint responden igual /status-programacion y /status-programacion+{fecha actual}
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'dia'
            expect(response.body).to.have.property('dia')
            // response to have property 'estado'
            expect(response.body).to.have.property('estado')
            // response to have property 'usuario'
            expect(response.body).to.have.property('usuario')
        })
    })


})
