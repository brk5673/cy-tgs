/// <reference types="cypress"/>
import { PASS3, USER3 } from "../../../../../fixtures/credentials"

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

    it('[listar <current date>] status 200 & properties', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/contratos-corte-entrega/?fecha=${today}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).not.to.include('text/html')
            })
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
        cy.today().then((today) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/contratos-corte-entrega/report?fecha=${today}&reportType=pdf&`
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

    it('[report <excel>] status200, .xls doc', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/contratos-corte-entrega/report?fecha=${today}&reportType=xls&`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                //expect response headers contain value file.xls
                expect(response.headers['content-disposition']).to.contain('.xls')
                // expect 'content length' contain string not equal to zero
                expect(response.headers['content-length']).not.to.equal('0')
            })
        })
    })

    it('[report <print>] status200, .pdf doc', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/contratos-corte-entrega/report?fecha=${today}&reportType=print&`
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

})

