/// <reference types="cypress"/>
import { LOADIPHLPAPI } from "dns"
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Juegos de Bandas> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[pantalla inicial <fecha ultima programacion>] status programacion & listado', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/proceso-batch/status-programacion',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('dia')
            expect(response.body).to.have.property('programacionFinalizada')
            expect(response.body).to.have.property('estado')
            expect(response.body).to.have.property('usuario')

            cy.request({
                url: `/api/spac/programacion/proceso-batch/juegos-banda/?fechaDesde=${response.body.dia}&fechaHasta=${response.body.dia}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('bandaMaxima')
                expect(response.body[0]).to.have.property('bandaMinima')
                expect(response.body[0]).to.have.property('codigoSociedad')
                expect(response.body[0]).to.have.property('editable')
                expect(response.body[0]).to.have.property('fechaProgramacion')
            })
        })

    })

    it('[listar <current date>] status 200 & properties', () => {
        cy.today().then((date) => {

            cy.get('@jsession').request({
                    url: `/api/spac/programacion/proceso-batch/juegos-banda/?fechaDesde=${date}&fechaHasta=${date}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('bandaMaxima')
                expect(response.body[0]).to.have.property('bandaMinima')
                expect(response.body[0]).to.have.property('codigoSociedad')
                expect(response.body[0]).to.have.property('editable')
                expect(response.body[0]).to.have.property('fechaProgramacion')
            })
        })
    })

    it('[listar <day after>] status 200 & properties', () => {
        cy.tomorrow().then((tommorrow) => {

            cy.get('@jsession').request({
                    url: `/api/spac/programacion/proceso-batch/juegos-banda/?fechaDesde=${tommorrow}&fechaHasta=${tommorrow}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('bandaMaxima')
                expect(response.body[0]).to.have.property('bandaMinima')
                expect(response.body[0]).to.have.property('codigoSociedad')
                expect(response.body[0]).to.have.property('editable')
                expect(response.body[0]).to.have.property('fechaProgramacion')
            })
        })
    })


    // accion grabar <us2141> ----------------------------

    it('[editar y grabar <fi=today, ff=tomorrow>] status 204 & properties', () => {
        cy.today().then((today) => {
            cy.tomorrow().then((tomorrow) => {


                cy.get('@jsession').request({
                        url: `/api/spac/programacion/proceso-batch/juegos-banda/?fechaDesde=${today}&fechaHasta=${tomorrow}`
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body[0]).to.have.property('bandaMaxima')
                    expect(response.body[0]).to.have.property('bandaMinima')
                    expect(response.body[0]).to.have.property('codigoSociedad')
                    expect(response.body[0]).to.have.property('editable')
                    expect(response.body[0]).to.have.property('fechaProgramacion')

                    cy.log(response.body[0].bandaMaxima)
                    cy.log(response.body[0].bandaMinima)
                    cy.log(response.body[1].bandaMaxima)
                    cy.log(response.body[1].bandaMinima)
                    cy.log(response.body[2].bandaMaxima)
                    cy.log(response.body[2].bandaMinima)
                    cy.log(response.body[3].bandaMaxima)
                    cy.log(response.body[3].bandaMinima)

                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/juegos-banda/', 
                        body: [{
                            "bandaMaxima": response.body[0].bandaMaxima +1,
                            "bandaMinima": response.body[0].bandaMinima -1,
                            "codigoSociedad": response.body[0].codigoSociedad,
                            "fechaProgramacion": response.body[0].fechaProgramacion
                        },
                        {
                            "bandaMaxima": response.body[1].bandaMaxima +1,
                            "bandaMinima": response.body[1].bandaMinima -1,
                            "codigoSociedad": response.body[1].codigoSociedad,
                            "fechaProgramacion": response.body[1].fechaProgramacion
                        },
                        {
                            "bandaMaxima": response.body[2].bandaMaxima +1,
                            "bandaMinima": response.body[2].bandaMinima -1,
                            "codigoSociedad": response.body[2].codigoSociedad,
                            "fechaProgramacion": response.body[2].fechaProgramacion
                        },
                        {
                            "bandaMaxima": response.body[3].bandaMaxima +1,
                            "bandaMinima": response.body[3].bandaMinima -1,
                            "codigoSociedad": response.body[3].codigoSociedad,
                            "fechaProgramacion": response.body[3].fechaProgramacion
                        }]
                    })
                    .then((response) => {
                        expect(response.status).to.eq(204)
                        cy.request(`/api/spac/programacion/proceso-batch/juegos-banda/?fechaDesde=${today}&fechaHasta=${tomorrow}`).then((response) => {
                            expect(response.status).to.eq(200)

                            cy.log(response.body[0].bandaMaxima)
                            cy.log(response.body[0].bandaMinima)
                            cy.log(response.body[1].bandaMaxima)
                            cy.log(response.body[1].bandaMinima)
                            cy.log(response.body[2].bandaMaxima)
                            cy.log(response.body[2].bandaMinima)
                            cy.log(response.body[3].bandaMaxima)
                            cy.log(response.body[3].bandaMinima)
                        })
                    })
                })
            })
        })
    })

    // exportar reporte <us2207> --------------------------------------

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.request({
            url: '/api/spac/programacion/proceso-batch/juegos-banda/report/?fechaDesde=2023-08-22&fechaHasta=2023-08-22&reportType=pdf&'
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
        cy.request({
            url: '/api/spac/programacion/proceso-batch/juegos-banda/report/?fechaDesde=2023-08-22&fechaHasta=2023-08-22&reportType=xls&'
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
        cy.request({
            url: '/api/spac/programacion/proceso-batch/juegos-banda/report/?fechaDesde=2023-08-22&fechaHasta=2023-08-22&reportType=print&'
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
