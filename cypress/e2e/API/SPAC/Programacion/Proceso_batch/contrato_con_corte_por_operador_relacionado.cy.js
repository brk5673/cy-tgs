/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Contratos con Corte por Operador Relacionado> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[pantalla inicial <init>] status 200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/init',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('entidadesLegales').not.to.be.empty
            expect(response.body).to.have.property('entrega').not.to.be.empty
            expect(response.body).to.have.property('recepcion').not.to.be.empty
        })
    })

    it('[status programacion <current date>] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/status-programacion',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('dia')
            expect(response.body).to.have.property('estado')
            expect(response.body).to.have.property('programacionFinalizada')
            expect(response.body).to.have.property('usuario')
        })
    })

    it('[listar <current date>] st200 & properties', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                    url: `/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/?fecha=${today}&tolerancia=0`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.exist
                //expect response body not contain html tag
                expect(response.headers['content-type']).not.to.include('text/html');
            })
        })
    })

    it('[listar <c/parametros 22Ago2025>] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/?fecha=2025-08-22&tolerancia=0&entidadLegal=4&servicio=ED,TF&entrega=BBR,BAS,GBA&recepcion=BBL,BAS,NQE,TDF'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            expect(response.body).to.have.property('contratos')
            expect(response.body.contratos[0].abreviatura).to.equal('METRO (4)')
            expect(response.body.contratos[1].abreviatura).to.equal('METRO (4)')
            expect(response.body.contratos[2].abreviatura).to.equal('METRO (4)')
            expect(response.body.contratos[1].abreviatura).to.not.contain('YPF (12)')
            //expect response body not contain html tag 
            expect(response.headers['content-type']).not.to.include('text/html')

        })
    })

    it('[ver <current date>] st200 & properties', () => {
        cy.today().then((today) => {

            cy.get('@jsession').request({
                    url: `/api/spac/programacionPorCamino/header?fechaProgramacion=${today}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.exist
                //expect response body not contain html tag 
                expect(response.headers['content-type']).not.to.include('text/html')

            })
        })
    })

    it('[ver <current date>] st200 & properties', () => {
        cy.today().then((today) => {

            cy.get('@jsession').request({
                    url: `/api/spac/programacionPorCamino?codigoContrato=TF117&fechaProgramacion=${today}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('caminos')
                expect(response.body).to.have.property('puntosEntrega')
                expect(response.body).to.have.property('puntosRecepcion')
                //expect response body not contain html tag 
                expect(response.headers['content-type']).not.to.include('text/html')

            })
        })
    })


    // reports ------------------------------------

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/report?fecha=${today}&tolerancia=0&entidadLegalAbreviatura=Todas&reportType=pdf`
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

    it('[report <excel>] status200, .pdf doc', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/report?fecha=${today}&tolerancia=0&entidadLegalAbreviatura=Todas&reportType=xls`
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
                //expect response headers contain value file.pdf
                expect(response.headers['content-disposition']).to.contain('.xls')
                // expect 'content length' contain string not equal to zero
                expect(response.headers['content-length']).not.to.equal('0')
            })
        })
    })

    it('[report <print>] status200, .pdf doc', () => {
        cy.today().then((today) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/report?fecha=${today}&tolerancia=0&entidadLegalAbreviatura=Todas&reportType=print`
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



})