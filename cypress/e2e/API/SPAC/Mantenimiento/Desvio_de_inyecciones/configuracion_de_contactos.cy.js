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
    





})