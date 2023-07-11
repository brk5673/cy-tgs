/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[estado programacion] status 200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion', // los endpoint responden igual /status-programacion y /status-programacion+{fecha actual}
        })
        .then((response) => {
            console.log(response.body['estado'])
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

    it('[estado programacion] <fecha definida> status 200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-06-20', // los endpoint responden igual /status-programacion y /status-programacion+{fecha actual}
        })
        .then((response) => {
            console.log(response.body['estado'])
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

/*     it('[cambiar fecha] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2022-12-29'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('dia')
            expect(response.body).to.have.property('programacionFinalizada')
            expect(response.body).to.have.property('estado')
            expect(response.body).to.have.property('usuario')
        })
    })
 */

    it('[cambiar fecha] status 4xx', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=100b-12-29',
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(400)
        })
    })


    // us2018-----------------------------------------------------------------

    it('[deshabilitar programacion] status200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO",
                "fecha": "2025-12-29"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.status)
        })
    })
    
    // get status programacion con fecha definida 2022-12-29
    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2022-12-29', 
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    /* it.only('[habilitar programacion] status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/programacion',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    }) */

    // us2025-----------------------------------------------------------------

    it('[habilitar interno] status200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "HABILITADO_INTERNO",
                "fecha": "2023-07-10"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-07-10',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body['estado'])

        })
    })

    // us2026-----------------------------------------------------------------

    it('[deshabilitar interno] status200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO_FUERA_DE_HORA",
                "fecha": "2023-07-10"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-07-10',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body['estado'])

        })
    })

    // us2027-----------------------------------------------------------------

    it.only('[ejecutar reprogramacion] status200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITAD" | "DESHABILITADO_FUERA_DE_HORA",
                "fecha": "2023-07-10"
              }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it.only('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-07-10',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body['estado'])

        })
    })

    it.only('[contratos sin solicitud] status200 & response', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/contratos-sin-solicitudes?fecha=2023-07-10',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('contrato')
            expect(response.body).to.have.property('entidadLegal')
        })
    })






    




    
})







