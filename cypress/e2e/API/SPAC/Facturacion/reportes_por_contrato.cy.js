/// <reference types="cypress"/>
import { PASS2, PASS4, USER2, USER4 } from "../../../../fixtures/credentials"

describe('API tests <Reportes por Contrato> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER2, PASS2)
    })

    it('[get <periodo>] status 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/contactos/getContratos',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(0)

        })
    })

    it('[get <sociedades>] status 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/reportesPorContrato/selectsociedad',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(0)

        })
    })

    it('[get <tipo reporte>] status 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/reportesPorContrato/gettiporeportes',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(0)

        })
    })

    it('[get <tipo cierre>] status 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/reportesPorContrato/selecttipocierre?periodo=2023%2F04',
        })
        .then((response) => {
            expect(response.status).to.eq(200)

        })
    })

    it('[listar] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST', // debe ser GET
            url: '/api/spac/facturacion/reportesPorContrato/listarreportes?periodo=2023/03&tipocierreajuste=C&nroajuste=0&tiporeporte=1&tiporeporte=2&tiporeporte=3&tiporeporte=4&tiporeporte=5&tiporeporte=6&tiporeporte=7&tiporeporte=8&tiporeporte=9&tiporeporte=10&',
        })
        .then((response) => {
            expect(response.status).to.eq(200)

        })
    })

    it('[generar] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/facturacion/reportesPorContrato/generarreportes?nuevoajuste=false&tiporeporte=6&periodo=2022%2F09&contrato=TF310',
            body: {
                "clave": PASS4,
                "usuario": USER4
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)

        })
    })


    it('[descargar zip] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST', 
            url: '/api/spac/facturacion/reportesPorContrato/descargarZip',
            body: [0]
        })
        .then((response) => {
            expect(response.status).to.eq(200)

        })
    })

    it('[enviar email] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST', //debe ser GET
            url: '/api/spac/facturacion/reportesPorContrato/enviarmail?periodo=2023/03&sociedad=LINK&contrato=TF711&tipocierreajuste=C&nroajuste=0&tiporeporte=2&',
        })
        .then((response) => {
            expect(response.status).to.eq(200)

        })
    })

    it('[imprimir] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/facturacion/reportesPorContrato/imprimirReportes',
            body: {
                "periodo":"2022/12",
                "sociedad":"TGSA",
                "tipoCierreAjuste":{
                    "secAjuste":0,
                    "estadoCierreAjuste":"A"
                },
                "tiposReportes":[1],
                "contrato":""
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')

        })
    })












})

