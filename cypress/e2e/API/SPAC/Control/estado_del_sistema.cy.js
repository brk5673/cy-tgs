/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../fixtures/credentials"

describe('API tests <Estado del Sistema> module', () => {
    beforeEach(() => {
     cy.loginAPI(USER1, PASS1)
    })
    it("init - status code 200", () => {
        cy.get('@jsession').then(token => {
            cy.request({
                method: 'GET',
                url: '/api/spac/control/estadodelsistema/init',
                headers: {
                    'Cookie': 'JSESSIONID='+token
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
            })
        })  
    })
    it('init - fechaMinima/fechaMaxima', () => {
        cy.get('@jsession').then(token => {
            cy.request({
                method: 'GET',
                url: '/api/spac/control/estadodelsistema/init',
                headers: {
                    'Cookie': 'JSESSIONID='+token
                }
            })
            .then((response) => {
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
    it('listar - status code 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/estadodelsistema/listar?fechaDesde=2021-06-13&fechaHasta=2021-06-13&sort=numeroEntidadLegal,asc'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
        })
    })
    it('listar - status code 400, ', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/estadodelsistema/listar?fechaDesde=2021-06-13&fechaHasta=2020-06-13&sort=numeroEntidadLegal,asc',
            failOnStatusCode: false
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(400)
        })
    })

})
