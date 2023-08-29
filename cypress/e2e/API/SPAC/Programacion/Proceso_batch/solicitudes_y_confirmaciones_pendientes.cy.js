/// <reference types="cypress"/>
import { totalmem } from "os"
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Solicitudes y Confirmaciones Pendientes> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

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

    it('[ver detalle <current date>] status 200 & properties', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.log(tomorrow)

            cy.request({
                method: 'POST',
                url: '/api/spac/solicitudEdi/saveLote',
                body: [{
                    "solicitudDto":{"fechaInicial":tomorrow,"fechaFinal":tomorrow,"codigoContrato":"ED072","entidadLegal":"ENERGY CONSULTING SERVICES S.A.","numeroSolicitud":null,"estado":null,"tipo":"M","dias":2,"usuario":"jdinesta","ultimaModificacion":"","version":0,"puntosRecepcion":[{"numeroPunto":19172,"nombrePunto":"TRANSF TDF/GBA TF-318 LITORAL AL ED-072 ECS","codigoZona":"GBA","nombreZona":null,"rolPunto":"Recepción","prioridadPunto":2,"referenciaAAAA":"ECS-LG-SWAP","cantidad":45000,"cantidadConfirmada":null,"cantidadConfirmadaRecepcion":null,"cantidadConfirmadaEntrega":null}],"puntosEntrega":[{"numeroPunto":248,"nombrePunto":"CAMARA BRAGADO-25 DE MAYO","codigoZona":"BUE","nombreZona":null,"rolPunto":"Entrega","prioridadPunto":1,"referenciaAAAA":"ECSARDION","cantidad":45000,"cantidadConfirmada":null,"cantidadConfirmadaRecepcion":null,"cantidadConfirmadaEntrega":null}],"caminos":[{"tipoCamino":"Normal","codigoZonaRecepcion":"GBA","nombreZonaRecepcion":"Gran Buenos Aires","prioridadRecepcion":15,"cantidadRecepcion":45000,"codigoZonaEntrega":"BUE","nombreZonaEntrega":"Buenos Aires","prioridadEntrega":16,"cantidadEntrega":45000,"cantidadFuel":0,"porcentajeFuel":0,"cmd":null}],"zonasPuntosRecepcion":[],"zonasPuntosEntrega":[],"editable":null,"borrable":null},"results":"1 - Advertencia - Se va a reemplazar la solicitud fuera de hora Nro. null. Confirme la importación por favor.\n","deshabilitar":false,"withConfirmation":true,"checked":true
                }]
            })
            .then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('[aceptar soli/confirm <day after>] status 200 & properties', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.request({
                url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${tomorrow}`,
            })
            .then((response) => {
                cy.request({
                    method: 'POST',
                    url: `/api/spac/programacion/proceso-batch/solicitudes-confirmaciones-pendientes/?fecha=${tomorrow}`,
                    body: {
                        "solicitudesConfirmaciones":[
                            {
                            "contrato":"ED072",
                            "numero": response.body.solicitudesConfirmaciones[0].numero
                            }
                        ]
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })



})



