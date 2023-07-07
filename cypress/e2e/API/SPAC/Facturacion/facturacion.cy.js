/// <reference types="cypress"/>
import { PASS2, USER2 } from "../../../../fixtures/credentials"

describe('API tests <Provision> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER2, PASS2)
    })

    it('[periodos <disponibles>] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/facturacion/disponibles',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body)
        })
    })

    it('[periodos <en revision>] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/facturacion/enRevision',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body)
        })
    })

    it('[periodos <transferibles>] status 200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/facturacion/transferibles',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body)
        })
    })

    




})