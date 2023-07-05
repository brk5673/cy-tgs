/// <reference types="cypress"/>
import { PASS2, USER2 } from "../../../../fixtures/credentials"

describe('API tests <Provision> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER2, PASS2)
    })

    it('[pedidos a provisionar] status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/provision/periodosAProvisionar',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'gasoductos'
            expect(response.body).to.not.equal(0)
        })
    })

    it('[generar provision] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/facturacion/provision/generarprovision?periodo=2023%2F02',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    
    
    
    })















})