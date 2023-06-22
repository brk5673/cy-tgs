/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../fixtures/credentials"

describe('API tests <Volumenes Operativos Finales> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER1, PASS1)
    })

    it('init - status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/volumenesoperativosfinales/init'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
        })
    })

    it('init - home page data', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/volumenesoperativosfinales/init'
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
            // response to have property 'maxPc' = 10200
            expect(response.body).to.have.property('maxPc')
            expect(response.body.maxPc).to.equal(10200)
            // response to have property 'minPc' = 8850
            expect(response.body).to.have.property('minPc')
            expect(response.body.minPc).to.equal(8850)

        })
    })

    it('listar - status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/volumenesoperativosfinales/listar?fecha=2021-06-21&sort=pC,desc'
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
            console.log(response)
        })
    })

    it('listar - status 400 [fecha invalida]', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/control/volumenesoperativosfinales/listar?fecha=2023-16-21&sort=pC,desc',
            failOnStatusCode: false
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(400)
        })
    })

    it('grabar - status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/control/volumenesoperativosfinales/grabar?fecha=2021-06-21',
            body: [
                    {
                        "numeroPunto": 111,
                        "caudal": 26499412,
                        "pC": 10888
                    }
                  ]
            
        })
        .then((response) => {
            // assertion with api response
            expect(response.status).to.eq(200)
        })
    })












       

})