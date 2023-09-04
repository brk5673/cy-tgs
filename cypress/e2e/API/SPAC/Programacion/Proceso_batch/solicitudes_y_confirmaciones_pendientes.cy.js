/// <reference types="cypress"/>
import { PASS3, USER3 } from "../../../../../fixtures/credentials"
// import  "../../../../../fixtures/EDIsolicitudes" 

describe('API tests <Solicitudes y Confirmaciones Pendientes> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    // pantalla inicial <us2107>----------------------------------------------------------------------------------------------------------------

    it('[pantalla inicial <current date>] status 200 & properties', () => {
        cy.today().then((date) => {
            cy.log(date)
            cy.request({
                // insertar url con fecha actual
                url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('aceptarHabilitado')
                expect(response.body).to.have.property('solicitudesConfirmaciones')
            })
        })
    })

    it('[pantalla inicial <day after>] status 200 & properties', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.log(tomorrow)

            cy.request({
                // insertar url con fecha actual
                url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${tomorrow}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('aceptarHabilitado')
                expect(response.body).to.have.property('solicitudesConfirmaciones')
            })
        })
    })

    //-----------------------------------------------------------------------------------


    // ver detalle de solicitud <us2108>------------------------ESTO ES SOLO FRONT, LO DEMAS YA ESTABA MIGRADO-------------------------------------------------------------

    it('[VER detalle <solicitud> <current date>] status 200 & properties', () => {
        cy.today().then((date) => {
            cy.get('@jsession').request({
                url: `/api/spac/solicitudes?fechaInicial=${date}&fechaFinal=${date}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).not.to.include('text/html')
                console.log(response.body.solicitudes[0].numeroSolicitud)
                console.log(response.body.solicitudes[0].codigoContrato)
                cy.request({
                    url: `/api/spac/solicitudes/${response.body.solicitudes[0].codigoContrato}/${response.body.solicitudes[0].numeroSolicitud}?enHora=true`
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('caminos')
                    expect(response.body).to.have.property('puntosEntrega')
                    expect(response.body).to.have.property('puntosRecepcion')
                    expect(response.body).to.have.property('zonasPuntosEntrega')
                    expect(response.body).to.have.property('zonasPuntosRecepcion')
                })
            })            
        })
    })

    it('[VER detalle <solicitud> <day after>] status 200 & properties', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                url: `/api/spac/solicitudes?fechaInicial=${tomorrow}&fechaFinal=${tomorrow}`
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).not.to.include('text/html')
                console.log(response.body.solicitudes[0].numeroSolicitud)
                console.log(response.body.solicitudes[0].codigoContrato)
                cy.request({
                    url: `/api/spac/solicitudes/${response.body.solicitudes[0].codigoContrato}/${response.body.solicitudes[0].numeroSolicitud}?enHora=true`
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('caminos')
                    expect(response.body).to.have.property('puntosEntrega')
                    expect(response.body).to.have.property('puntosRecepcion')
                    expect(response.body).to.have.property('zonasPuntosEntrega')
                    expect(response.body).to.have.property('zonasPuntosRecepcion')
                })
            })
        })
    })
    

    // aceptar solicitudes y confirmaciones pendientes <us2109>----------------------------------------------------------------------

    it('[aceptar s&c <current date>] status 200 & properties', () => {
        cy.today().then((date) => {
            cy.request({
                url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${date}`,
            })
            .then((response) => {
                if (response.body.solicitudesConfirmaciones.length > 0) {
                    cy.request({
                        method: 'POST',
                        url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${date}`,
                        body: {
                            "solicitudesConfirmaciones":[
                                {
                                    "contrato":response.body.solicitudesConfirmaciones[0].contrato,
                                    "numero": response.body.solicitudesConfirmaciones[0].numero
                                }
                            ]
                        }
                    })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.headers['content-type']).not.to.include('text/html')
                }
            })
        })
    })

    it('[aceptar s&c <day after>] status 200 & properties', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.request({
                url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${tomorrow}`,
            })
            .then((response) => {
                if (response.body.solicitudesConfirmaciones.length > 0) {
                    cy.request({
                        method: 'POST',
                        url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${tomorrow}`,
                        body: {
                            "solicitudesConfirmaciones":[{
                                "contrato":response.body.solicitudesConfirmaciones[0].contrato,
                                "numero": response.body.solicitudesConfirmaciones[0].numero
                            }]
                        }
                    })
                    .then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.headers['content-type']).not.to.include('text/html')
                }
            })
        })
    })



})



