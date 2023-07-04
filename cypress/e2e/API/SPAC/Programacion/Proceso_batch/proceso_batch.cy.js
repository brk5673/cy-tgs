/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it.only('[estado programacion] status code 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-06-20', // los endpoint responden igual /status-programacion y /status-programacion+{fecha actual}
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
            console.log(response.body['estado'])
            // response to have property 'usuario'
            expect(response.body).to.have.property('usuario')
        })
    })

    // fecha limite
    it('[fecha limite] status 200 & properties', () => {
        cy.get('@jsession').request('/api/common/date/frontend-limits')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('fechaMaxima')
                expect(response.body['fechaMaxima']).to.eq('2099-12-31T23:59:59')
                expect(response.body).to.have.property('fechaMinima')
                expect(response.body['fechaMinima']).to.equal('1990-01-01T00:00:00')
            })
    })

    it('[cambiar fecha] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2022-12-29'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('dia')
            expect(response.body).to.have.property('fechaUltimaProgramacion')
            expect(response.body).to.have.property('estado')
            expect(response.body).to.have.property('usuario')
        })
    })

    it('[cambiar fecha] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=100-12-29',
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('[deshabilitar programacion] status200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "SIN_PROGRAMACION",
                "fecha": "2023-06-20"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    

    




    
})









