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











})
