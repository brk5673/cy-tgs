/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
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

    it('[status programacion] st200 & properties', () => {
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

    it('[listar <22Ago2025>] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/contratos-corte-operador-relacionado/?fecha=2025-08-22&tolerancia=0'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            //expect response body not contain html tag
            expect(response.headers['content-type']).not.to.include('text/html');

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

    it('[ver <22Ago2023>] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacionPorCamino/header?fechaProgramacion=2023-08-22'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            //expect response body not contain html tag 
            expect(response.headers['content-type']).not.to.include('text/html')

        })
    })

    it.only('[ver <22Ago2023>] st200 & properties', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacionPorCamino?codigoContrato=TF117&fechaProgramacion=2023-08-22'
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