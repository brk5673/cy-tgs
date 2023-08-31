/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Contratos con Corte a la Entrega> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[status programacion <current date>] status 200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/status-programacion',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('dia')
            expect(response.body).to.have.property('programacionFinalizada')
            expect(response.body).to.have.property('estado')
            expect(response.body).to.have.property('usuario')
        })
    })

    it('[listar <22Ago2025>] status 200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/contratos-corte-entrega/?fecha=2025-08-22',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.headers['content-type']).not.to.include('text/html')
        })
    })

    it('[listar <bad request>] status 400', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/contratos-corte-entrega/?fecha=2023-08-56', // date 56Aug2023
                failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    //--------------- exportar reporte <us2214> ----------------------------

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/contratos-corte-entrega/report?fecha=2023-08-22&reportType=pdf&'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report <excel>] status200, .xls doc', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/contratos-corte-entrega/report?fecha=2023-08-22&reportType=xls&'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            //expect response headers contain value file.xls
            expect(response.headers['content-disposition']).to.contain('.xls')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

    it('[report <print>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/contratos-corte-entrega/report?fecha=2023-08-22&reportType=print&'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
            // expect 'content length' contain string not equal to zero
            expect(response.headers['content-length']).not.to.equal('0')
        })
    })

})

