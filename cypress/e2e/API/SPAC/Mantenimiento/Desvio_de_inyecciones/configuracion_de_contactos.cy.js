/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../../fixtures/credentials"

describe('API tests <Consulta de Desvio de Inyecciones> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER1, PASS1)
    })

    it('[init] status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'entidadesLegales'
            expect(response.body).to.have.property('entidadesLegales')
            // response to have property 'gasoductos'
            expect(response.body).to.have.property('gasoductos')
        })
    })

    it('[listar] status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/listar',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response have an array
            expect(response.body).to.have.length.greaterThan(0)
        })
    })

    it('[grabar] <alta> status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/grabar',
            body: {
                "altas": [
                  {
                    "ccDeficit": false,
                    "ccExcesoConMapo": false,
                    "ccExcesoSinMapo": false,
                    "email": "messi10@gmail.ar",
                    "id": 0,
                    "idGasoducto": "640",
                    "nombre": "messi10",
                    "nroEntidadLegal": 130,
                    "paraDeficit": false,
                    "paraExcesoConMapo": false,
                    "paraExcesoSinMapo": false
                  }
                ],
                "bajas": [],
                "modificaciones": []
            }
        })
    })
     
    it('[grabar] <editar> status 200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/listar',
        })
        .then((response) => {
            const id0 = response.body[0].id

            cy.request({
                method: 'POST',
                url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/grabar',
                body: {
                    "altas": [],
                    "bajas": [],
                    "modificaciones": [
                        {
                            "ccDeficit": false,
                            "ccExcesoConMapo": false,
                            "ccExcesoSinMapo": false,
                            "email": "messi101@gmail.ar",
                            "id": id0,
                            "idGasoducto": "640",
                            "nombre": "messi101",
                            "nroEntidadLegal": 130,
                            "paraDeficit": false,
                            "paraExcesoConMapo": false,
                            "paraExcesoSinMapo": false
                        }
    
                    ]
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
            })
        })
    })

    it('[grabar] <baja> status 200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/listar',
        })
        .then((response) => {
            const id0 = response.body[0].id

            cy.request({
                method: 'POST',
                url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/grabar',
                body: {
                    "altas": [],
                    "bajas": [id0],
                    "modificaciones": []
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
            })
        })
    })

    it('[report] <xls> status200, .xls doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/report?reportType=xls'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.xls
            expect(response.headers['content-disposition']).to.contain('.xls')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report] <pdf> status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/report?reportType=pdf'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report] <print> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desviodeinyeccion/configuraciondecontactos/report?reportType=print'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })



    





})