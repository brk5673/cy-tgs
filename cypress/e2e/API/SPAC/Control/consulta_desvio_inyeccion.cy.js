/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../fixtures/credentials"

describe('API tests <Consulta de Desvio de Inyecciones> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER1, PASS1)
    })

    it('[init] status 200, response properties', () => {
        cy.request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/init'
        })
        .then((response) => {
            // assertion status200 api response
            expect(response.status).to.eq(200)
            // response to have property 'fechaminima' & YYYY-MM-DD format
            expect(response.body).to.have.property('fechaMinima')
            expect(response.body.fechaMinima).to.match(/\d{4}-\d{2}-\d{2}/)
            // response to have property 'fechamaxima' & YYYY-MM-DD format
            expect(response.body).to.have.property('fechaMaxima')
            expect(response.body.fechaMaxima).to.match(/\d{4}-\d{2}-\d{2}/)
            // response to have property 'fechaDefaultSelected'
            expect(response.body).to.have.property('fechaFinalDefaultSelected')
            expect(response.body).to.have.property('fechaInicialDefaultSelected')
            
        })
    })

    it('[listar] status 200, properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/?fechaDesde=2021-06-21T06:00:00&fechaHasta=2021-06-21T06:00:00'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
            // expect 'body.errores' contain string not equal to zero
            expect(response.body['errores']).not.to.equal('0')
        })
    })

    it('[listar] status code 400, ', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/?fechaDesde=2021-06-21T06:00:00&fechaHasta=2021-06-203T05:00:00',
            failOnStatusCode: false
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(400)
        })
    })

    it('[get nota] <NOTA 1 CON SUPERACION> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/nota-desvio?gasoducto=310&operador=111&tipoNota=NOTA_1_CON_SUPERACION&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T09:00:00'
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            // expect 'body.errores' contain string not equal to zero
            expect(response.body['errores']).not.to.equal('0')
        })
    })

    it('[get nota] <NOTA 2 CON SUPERACION> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/nota-desvio?gasoducto=310&operador=111&tipoNota=NOTA_2_CON_SUPERACION&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T09:00:00'
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            // expect 'body.errores' contain string not equal to zero
            expect(response.body['errores']).not.to.equal('0')
        })
    })

    it('[get nota] <NOTA 1 SIN SUPERACION> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/nota-desvio?gasoducto=310&operador=111&tipoNota=NOTA_1_SIN_SUPERACION&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T09:00:00'
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            // expect 'body.errores' contain string not equal to zero
            expect(response.body['errores']).not.to.equal('0')
        })
    })

    it('[get nota] <NOTA 2 SIN SUPERACION> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/nota-desvio?gasoducto=310&operador=111&tipoNota=NOTA_2_SIN_SUPERACION&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T09:00:00'
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            // expect 'body.errores' contain string not equal to zero
            expect(response.body['errores']).not.to.equal('0')
        })
    })

    it('[get nota] <NOTA DEFICIT DE INYECCION> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/nota-desvio?gasoducto=310&operador=111&tipoNota=NOTA_DEFICIT_DE_INY&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T09:00:00'
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            // expect 'body.errores' contain string not equal to zero
            expect(response.body['errores']).not.to.equal('0')
        })
    })

    it('[enviar nota] <NOTA 1 CON SUPERACION>', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/desvio-inyeccion/enviar-nota',
            body: {
                "gasoducto": "310",
                "operador": 384,
                "tipoNota": "NOTA_1_CON_SUPERACION",
                "valorIngresado": "string",
                "fechaDesde": "2020-06-21T06:00:00",
                "fechaHasta": "2020-06-21T17:00:43"
            }
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(204)
        })
    })

    it('[enviar nota] <NOTA 2 CON SUPERACION>', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/desvio-inyeccion/enviar-nota',
            body: {
                "gasoducto": "310",
                "operador": 384,
                "tipoNota": "NOTA_2_CON_SUPERACION",
                "valorIngresado": "string",
                "fechaDesde": "2020-06-21T06:00:00",
                "fechaHasta": "2020-06-21T17:00:43"
            }
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(204)
        })
    })

    it('[enviar nota] <NOTA 1 SIN SUPERACION>', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/desvio-inyeccion/enviar-nota',
            body: {
                "gasoducto": "310",
                "operador": 384,
                "tipoNota": "NOTA_1_SIN_SUPERACION",
                "valorIngresado": "string",
                "fechaDesde": "2020-06-21T06:00:00",
                "fechaHasta": "2020-06-21T17:00:43"
            }
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(204)
        })
    })

    it('[enviar nota] <NOTA 2 SIN SUPERACION>', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/desvio-inyeccion/enviar-nota',
            body: {
                "gasoducto": "310",
                "operador": 384,
                "tipoNota": "NOTA_2_SIN_SUPERACION",
                "valorIngresado": "string",
                "fechaDesde": "2020-06-21T06:00:00",
                "fechaHasta": "2020-06-21T17:00:43"
            }
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(204)
        })
    })

    it('[enviar nota] <NOTA DEFICIT DE INYECCION>', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/desvio-inyeccion/enviar-nota',
            body: {
                "gasoducto": "310",
                "operador": 384,
                "tipoNota": "NOTA_DEFICIT_DE_INY",
                "valorIngresado": "string",
                "fechaDesde": "2020-06-21T06:00:00",
                "fechaHasta": "2020-06-21T17:00:43"
            }
        }).then((response) => {
            // assertion on api response
            expect(response.status).to.eq(204)
        })
    })

    it('[report <xls>] status200, .xls doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/report?gasoducto=310&operador=111&reportType=xls&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T16:00:00'
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

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/report?gasoducto=310&operador=111&reportType=pdf&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T16:00:00'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.xls
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report <print>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/report?gasoducto=310&operador=111&reportType=print&fechaDesde=2020-06-21T06:00:00&fechaHasta=2020-06-21T16:00:00'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.xls
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report <print>] status 4xx', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/desvio-inyeccion/report?gasoducto=310&operador=111&reportType=print&fechaDesde=11112026-06-21T06:00:00&fechaHasta=2023-06-21T16:00:00',
            failOnStatusCode: false
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(400)
        })
    })





    




        


})
