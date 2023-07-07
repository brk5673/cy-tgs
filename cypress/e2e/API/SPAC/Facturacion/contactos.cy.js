/// <reference types="cypress"/>
import { PASS2, USER2 } from "../../../../fixtures/credentials"

describe('API tests <Contactos> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER2, PASS2)
    })

    it('[get] status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/contactos/getContratos',
        })
        .then((response) => {
            console.log(response.body[0])
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.have.property('abreviaturaEntidadLegal')
            expect(response.body[0]).to.have.property('codigoContrato')
            expect(response.body[0]).to.have.property('nombreEntidadLegal')
            expect(response.body[0]).to.have.property('numeroEntidadLegal')

        })
    })

    it('[listar] status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/contactos/listarContactos?el=685&contrato=ED887',
        })
        .then((response) => {
            console.log(response.body[0])
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.have.property('contrato')
            expect(response.body[0]).to.have.property('email')
            expect(response.body[0]).to.have.property('entidadLegal')
            expect(response.body[0]).to.have.property('id_contacto')
            expect(response.body[0]).to.have.property('nombre')
            expect(response.body[0]).to.have.property('numeroContacto')
            console.log(response.body[0].entidadLegal)

        })
    })

    it('[grabar] <alta> status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/facturacion/contactos/grabar',
            body: {
                "altas": [
                  {
                    "contrato": "TI448",
                    "email": "messi10@gmail.ar",
                    "id_contacto": 0,
                    "entidadLegal": "ACINDAR INDUSTRIA ARG. DE ACERO S.A",
                    "nombre": "messi10",
                    "numeroContacto": 1,
                  }
                ],
                "bajas": [],
                "modificaciones": []
            }
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })

    })

    it('[grabar] <editar> status 200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/facturacion/contactos/listarContactos?el=776&contrato=TI448',
        })
        .then((response) => {
            const id0 = response.body[0].id_contacto
            console.log(response.body[0].email)

            cy.request({
                method: 'POST',
                url: '/api/spac/facturacion/contactos/grabar',
                body: {
                    "altas": [],
                    "bajas": [],
                    "modificaciones": [{
                            "contrato": "TI448",
                            "email": "messi1001@gmail.ar", // dato a modificar
                            "id_contacto": id0,
                            "entidadLegal": "ACINDAR INDUSTRIA ARG. DE ACERO S.A",
                            "nombre": "messi10",
                            "numeroContacto": 1,
                    }]
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)

            })
        })
    })

    it('[grabar] <baja> status 200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/facturacion/contactos/listarContactos?el=776&contrato=TI448',
        })
        .then((response) => {
            const id0 = response.body[0].id_contacto
            console.log(response.body[0].email)

            cy.request({
                method: 'POST',
                url: '/api/spac/facturacion/contactos/grabar',
                body: {
                    "altas": [],
                    "bajas": [id0],
                    "modificaciones": []
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
            })
        })
    })

    it('[report] <xls> status200, .xls doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/contactos/xls?el=685&contrato=ED887'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.xls
            expect(response.headers['content-disposition']).to.contain('.xls')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report] <pdf> status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/contactos/pdf?el=685&contrato=ED887'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report] <print> status200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/contactos/pdf?el=685&contrato=ED887'
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

















})