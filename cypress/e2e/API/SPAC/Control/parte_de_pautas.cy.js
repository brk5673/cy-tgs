/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../fixtures/credentials"

describe('API tests <Parte de Pautas> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER1, PASS1)
    })

    it('[init] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/partedepautas/init'
        })
        .then((response) => {
            // assertion status200 api response
            expect(response.status).to.eq(200)
        })
    })

    it('[init] response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/partedepautas/init'
        })
        .then((response) => {
            // response to have property 'fechaminima' & YYYY-MM-DD format
            expect(response.body).to.have.property('fechaMinima')
            expect(response.body.fechaMinima).to.match(/\d{4}-\d{2}-\d{2}/)
            // response to have property 'fechamaxima' & YYYY-MM-DD format
            expect(response.body).to.have.property('fechaMaxima')
            expect(response.body.fechaMaxima).to.match(/\d{4}-\d{2}-\d{2}/)
            // response to have property 'fechaDefaultSelected'
            expect(response.body).to.have.property('fechaDefaultSelected')
        })
    })

    it('[listar] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/partedepautas/listar?fecha=2021-06-21'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
        })
    })

    it('[listar] status 400', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/partedepautas/listar?fecha=20212-06-21',
            failOnStatusCode: false
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(400)
        })
    })

    it('[enviar] status 200 + response properties', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/partedepautas/enviar?fecha=2021-06-21',
            body: {
                "fechaGeneracion": "2020-05-14T14:30:00",
                "fechaOperativo": "2020-05-14",
                "recepGlobales": {
                  "cuencaSurProgramada": 1234,
                  "cuencaSurRealizada": 1234,
                  "cuencaNeuquinaProgramada": 1234,
                  "cuencaNeuquinaRealizada": 1234
                },  
                "estadoSistemaOperativo": {
                  "estado": "String",
                  "motivo": "String"
                },
                "linePack": {
                  "diaAnterior": 123456.123,
                  "diaActual": 123456.123,
                  "variacion": 123456.123
                },
                "poderCalorificoTramoGasoducto": {
                  "sanMartinLlegada": 1234,
                  "neubaILlegada": 1234,
                  "neubaIILlegada": 1234,
                  "gutierrezLlegada": 1234,
                  "buchananILlegada": 1234,
                  "buchananIILlegada": 1234,
                  "troncalSalida": 1234,
                  "paraleloSalida": 1234,
                  "neubaIISalida": 1234,
                  "rodriguezSalida": 1234,
                  "pachecoSalida": 1234,
                  "ezeizaSalida": 1234
                },  
                "observaciones": "String"
              }
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-type']).to.contain('pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })











})
