/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Exceso en contratos TI> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[pantalla inicial] status 200 & properties', () => {
        cy.request({
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

    it('[listar <fecha final = 24Ago2023>] status 200 & properties', () => {
        cy.request({
            url: '/api/spac/programacion/proceso-batch/exceso-contratos-ti/?fechaFinal=2023-08-24&fechaInicial=2023-08-01'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            expect(response.body[0]).to.have.property('codigoContrato')
            expect(response.body[0]).to.have.property('cantidadMensualMaxima')
            expect(response.body[0]).to.have.property('cantidadTotalProgramada')
            expect(response.body[0]).to.have.property('diferencia')
        })
    })

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.request({
            url: '/api/spac/programacion/proceso-batch/exceso-contratos-ti/report?reportType=pdf&fechaInicial=2023-08-01&fechaFinal=2023-08-24'
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
            url: '/api/spac/programacion/proceso-batch/exceso-contratos-ti/report?reportType=xls&fechaInicial=2023-08-01&fechaFinal=2023-08-24'
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
            url: '/api/spac/programacion/proceso-batch/exceso-contratos-ti/report?reportType=print&fechaInicial=2023-08-01&fechaFinal=2023-08-24'
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
