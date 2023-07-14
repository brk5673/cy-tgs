/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    //us1973-----------------------------------------------------------------

    it('[estado programacion] status 200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion', //  Valor fecha por default de última programación, sin hora. 
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

    //estado programacion fecha invalida
    it('[estado programacion] <fecha invalida> status 400', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=1980-06-20', // limit date > 1990-01-01
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.have.property('message')
        })
    })

    //bad request
    it('[estado programacion] url invalida status 400', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-?fecha=2023-06-20&', // without 'programacion'
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('[estado programacion] <fecha definida> status 200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-06-20', 
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

    // us2018 => [DESHABILITAR PROGRAMACION]-----------------------------------------------------------------

    it('[deshabilitar programacion] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('SIN_PROGRAMACION')
        })
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO",
                "fecha": "2023-10-28"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    
    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28', 
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO')
        })
    })

    // us2025 => [HABILITAR INTERNO]-----------------------------------------------------------------

    it('[habilitar interno] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO')
        })

        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "HABILITADO_INTERNO",
                "fecha": "2023-10-28"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('HABILITADO_INTERNO')

        })
    })

    // us2026 => [DESHABILOITAR INTERNO]-----------------------------------------------------------------

    it('[deshabilitar interno] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('HABILITADO_INTERNO')
        })
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO_FUERA_DE_HORA",
                "fecha": "2023-10-28"
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
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO_FUERA_DE_HORA')
            

        })
    })

    // us2027 => [Ejecutar (Re)Programación -> Ctos sin solicitudes]-----------------------------------------------------------------

    it.only('[ejecutar reprogramacion] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO_FUERA_DE_HORA')
        })
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITAD" | "DESHABILITADO_FUERA_DE_HORA",
                "fecha": "2023-10-28"
              }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it.only('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)


        })
    })

    it.only('[contratos sin solicitud] status200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/contratos-sin-solicitudes/?fecha=2023-10-28',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.have.property('codigoContrato')
            expect(response.body[0]).to.have.property('nombreEntidadLegal')
        })
    })

    //us2212------------------------------------------------------------------

    it('[puntos sin confirmacion] status200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/?fecha=2023-07-12',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.have.property('cantidadSolicitada')
            expect(response.body[0]).to.have.property('nombrePunto')
            expect(response.body[0]).to.have.property('nroContrato')
        })
    })

    //us2073------------------------------------------------------------------

    it('[contratos sin solicitud - puntos sin confirmacion - contratos con corte a la entrega] status200 & properties', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO_PROGRAMADO",
                "fecha": "2023-07-12"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-07-12',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body['estado'])

        })
    })

    //us2096------------------------------------------------------------------

    it('[contratos con corte a la entrega => excesos en contratos] status200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/sasas/progasasaramasion/proceso-vatch/conddsdsdga/?fecha=2023-07-12',
        })
        .then((response) => {
            expect(response.status).to.eq(200)


        })
    })





















    //us2118------------------------------------------------------------------

    it('[contratos con corte a la entrega => excesos en contratos] status200 & properties', () => {
        cy.request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/contratos-con-corte-a-la-entrega/?fecha=2023-07-12',

        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body)
        
        })

    })














    




    
})

