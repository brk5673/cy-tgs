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
            url: '/api/spac/control/estadodelsistema/listar?fechaDesde=2023-06-21&fechaHasta=2023-06-21'
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

    it('estado general - status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/estadodelsistema/estadogeneral?fechaDesde=2023-06-21&fechaHasta=2023-06-21'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
        })
    })

    it('estado general - print general status', () => {
        cy.get('@jsession').request({
            url: '/api/spac/control/estadodelsistema/estadogeneral?fechaDesde=2023-06-21&fechaHasta=2023-06-21'
        })
        .then((response) => {
            // assertion with api response
            console.log(response.body)
            // expect print body response
            expect(response.body).to.have.property('estado')
            expect(response.body['estado']).to.not.be.empty
            // print his value
            console.log(response.body['estado'])
        })
    })

    it('agregar - status 200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/control/estadodelsistema/agregar'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('agregar nuevo - status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/estadodelsistema/agregarnuevo',
            body: {
                "fecha": "2023-06-21",
                "entidadLegal": 648,
                "estado": 2,
                "observacion": "messi"    
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('agregar nuevo - status 500', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/estadodelsistema/agregarnuevo',
            failOnStatusCode: false,
            body: {
                "fecha": "2023-06-21",
                "entidadLegal": 648,
                "estado": 66,
                "observacion": "messi"    
            }
        })
        .then((response) => {
            expect(response.status).to.eq(500)
            console.log(response.status)
        })
    })













})
