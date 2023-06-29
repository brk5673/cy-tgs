/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../../fixtures/credentials"

describe('API tests <Administracion de Desvio de Inyecciones> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER1, PASS1)
    })

    it('[init] <PUNTOS PARA MAPO> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'gasoductos'
            expect(response.body).to.have.property('gasoductos')
        })
    })

    it('[listar] <PUNTOS PARA MAPO> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })


    
    it('[init] <UMBRAL POR OPERADOR> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'gasoductos'
            expect(response.body).to.have.property('gasoductos')
        })
    })

    it('[listar] <UMBRAL POR OPERADOR> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })



    it('[listar] <NOTAS DE DESVIO> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/notas-desvio/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })



    it('[init] <PUNTOS EXCEPTUADOS> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })

    it('[listar] <PUNTOS EXCEPTUADOS> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })

















})
