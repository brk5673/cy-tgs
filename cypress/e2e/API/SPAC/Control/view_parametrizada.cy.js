/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../fixtures/credentials"

describe('API tests <View Parametrizada> module', () => {
    beforeEach(() => {
     cy.loginAPI(USER1, PASS1)
    })
    
    it('[init] status code 200, response properties', () => {
        cy.get('@jsession').then(token => {
            cy.request({
                method: 'GET',
                url: '/api/spac/control/viewparametrizada/init',
                headers: {
                    'Cookie': 'JSESSIONID='+token
                }
            })
            .then((response) => {
                // validate response have JSON format
                expect(response.headers['content-type']).to.not.eq('application/json')
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
                // response to have property 'fechaminima'
                expect(response.body).to.have.property('fechaMinima')
                // response to have property 'fechamaxima'
                expect(response.body).to.have.property('fechaMaxima')
                // expect format date YYYY-MM-DD
                expect(response.body.fechaMinima).to.match(/\d{4}-\d{2}-\d{2}/)
                expect(response.body.fechaMaxima).to.match(/\d{4}-\d{2}-\d{2}/)
            })
        })  
    })

    it('[listar] status code 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/listar?codigo=8&fechaDesde=2021-04-25&fechaHasta=2021-04-25&tipoDato=P&tipoVolumen=A&sort=volStdM3D,desc'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
        })
    })

    it('[listar] response with properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/listar?codigo=8&fechaDesde=2021-04-25&fechaHasta=2021-04-25&tipoDato=P&tipoVolumen=A&sort=volStdM3D,desc'
        })
        .then((response) => {
            // assertion with api response
            console.log(response.body)
            // expect to have property 'diaOperativo'
            expect(response.body[0]).to.have.property('diaOperativo')
            // expect to have property 'color'
            expect(response.body[0]).to.have.property('color')
            // expect to have property 'volStdM3D'
            expect(response.body[0]).to.have.property('volStdM3D')
            // expect to have property 'descripcion'
            expect(response.body[0]).to.have.property('descripcion')
            // expect to have property 'codigo'
            expect(response.body[0]).to.have.property('codigo')
        })
    })

    it('[listar] status 4xx parametros invalidos', () => {
            cy.request({
                method: 'GET',
                url: '/api/spac/control/viewparametrizada/listar?codigo=8&fechaDesde=2021-04-25&fechaHasta=2021-04-25&tipoDato=R&tipoVolumen=A&sort=volStdM3D,desc',
                failOnStatusCode: false
            }).then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                console.log(response.status)
                response.status.should.equal(400)
            })
        
    })

    it('[edi] status code 200', () => {
        cy.get('@jsession').then(token => {
            console.log(token)
            cy.request({
                method: 'GET',
                url: '/api/spac/control/viewparametrizada/generaredi?codigo=CERRI&fechaDesde=2021-03-16&fechaHasta=2021-03-16&tipoDato=G&tipoVolumen=A'
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
                // assertion response not empty
                expect(response.body).to.not.be.empty
            })
        })
    })

    it('[edi] status code 4xx fecha invalida', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/generaredi?codigo=CERRI&fechaDesde=2023-03-16&fechaHasta=2021-03-16&tipoDato=G&tipoVolumen=A',
            failOnStatusCode: false
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            console.log(response.status)
            response.status.should.equal(400)
        })
    })

    it('[report - xls] status200, .xls doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/report?reportType=xls&codigo=157%2B515&fechaDesde=2021-02-22&fechaHasta=2021-03-22&tipoDato=G&tipoVolumen=P&sort=promedio9300M3H,desc'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.xls')
        })
    })

    it('[report - pdf] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/report?reportType=pdf&codigo=157%2B515&fechaDesde=2021-02-22&fechaHasta=2021-03-22&tipoDato=G&tipoVolumen=P&sort=promedio9300M3H,desc'
        })
        .then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
        })
    })

    it('[report - print] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/report?reportType=print&codigo=157%2B515&fechaDesde=2021-02-22&fechaHasta=2021-03-22&tipoDato=G&tipoVolumen=P&sort=promedio9300M3H,desc'
        })
        .then((response) => {
            // assertion on api response
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
        })
    })

    it('[report - print] contain pdf', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/viewparametrizada/report?reportType=print&codigo=157%2B515&fechaDesde=2021-02-22&fechaHasta=2021-03-22&tipoDato=G&tipoVolumen=P&sort=promedio9300M3H,desc'
        })
        .then((response) => {
            // assertion on api response
            expect(response.body).to.contain('PDF')
        })
    })
})
