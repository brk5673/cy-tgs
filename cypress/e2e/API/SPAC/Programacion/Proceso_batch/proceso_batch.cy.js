/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    // <us1973> Manu, pantalla y carga inicial -----------------------------------------------------------------

    it('[status programacion <current day>] status 200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion', //  Valor fecha por default de última programación, sin hora. 
        })
        .then((response) => {
            console.log(response.body['estado'])
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'dia'
            expect(response.body).to.have.property('dia')
            // response to have property 'estado'
            expect(response.body).to.have.property('estado')
            // response to have property 'usuario'
            expect(response.body).to.have.property('usuario')
        })
    })

/*     // status programacion fecha invalida  => FALLA CON STATUS 200 PERO NO HAY INFORMACION PARA ESA FECHA
    it('[status programacion <fecha invalida>] status 400', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=1970-06-20', // limit date > 1990-01-01
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(405) // O 404
            expect(response.headers['content-type']).not.to.include('text/html')
        })
    })
*/    

/*     // bad request
    it('[status programacion] url invalida status 400', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-?fecha=2023-06-20&', // without 'programacion'
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })
 */

// fechas limites minimos y maximos

    it('[fecha limite] status 200 & values', () => {
        cy.get('@jsession').request('/api/common/date/frontend-limits').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('fechaMaxima')
            expect(response.body['fechaMaxima']).to.eq('2099-12-31T23:59:59')
            expect(response.body).to.have.property('fechaMinima')
            expect(response.body['fechaMinima']).to.equal('1990-01-01T00:00:00')
        })
    })
    

// batch process e2e <dia actual> ---------------------------------------------------------------------------------------------

    it('[batch process <current date>] e2e batch process', () => {
        cy.today().then((date) => {

        // deshabiitar programacion
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'SIN_PROGRAMACION') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                    
                } else if (response.body.estado == 'HABILITADO') {
                    console.log(response.body['estado'])
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    console.log(response.body['estado'])
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
            })


        // habilitar interno
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "HABILITADO_INTERNO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else if (response.body.estado == 'DESHABILITADO_PROGRAMADO') {
                    console.log(response.body['estado'])
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "HABILITADO_INTERNO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    console.log(response.body['estado'])
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
            })


        // deshabiitar interno
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'HABILITADO_INTERNO') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO_FUERA_DE_HORA",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
                console.log(response.body['estado'])
            })


        // ejecutar (re)programacion
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO_FUERA_DE_HORA') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO_PROGRAMADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
                console.log(response.body['estado'])
            })


        // <us2073> Continuar Programación 1: Ctos sin solicitud / Ptos sin confirmación -> Ctos con cortes de entrega -------------------------------------
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('cantidadSolicitada')
                expect(response.body[0]).to.have.property('nombrePunto')
                expect(response.body[0]).to.have.property('nroContrato')

                cy.request({
                    method: 'POST',
                    url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                    body: {
                        "estado": "DESHABILITADO_PROGRAMADO",
                        "fecha": date
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        

/*         // habilitar programacion (para re-ejecutar pb)
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO_PROGRAMADO') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        failOnStatusCode: false,
                        body: {
                            "estado": "HABILITADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        if (response.status == 409) {
                            expect(response.status).to.eq(409)
                            expect(response.body).to.have.property('message')
                        } else {
                            expect(response.status).to.eq(200)
                        }
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
                console.log(response.body['estado'])
            })
 */        })
    })



// batch process e2e <dia despues> -------------------------------------------------------------------------------------------

    it('[batch process <day after>] e2e batch process', () => {
        cy.tomorrow().then((date) => {
            
        // deshabiitar programacion
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'SIN_PROGRAMACION') {
                    console.log(response.body['estado']) 
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else if (response.body.estado == 'HABILITADO') {
                    console.log(response.body['estado'])
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    console.log(response.body['estado'])
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
            })


        // habilitar interno
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO') {
                    console.log(response.body['estado'])
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "HABILITADO_INTERNO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else if (response.body.estado == 'DESHABILITADO_PROGRAMADO') {
                    console.log(response.body['estado'])
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "HABILITADO_INTERNO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    console.log(response.body['estado'])
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
            })


        // deshabiitar interno
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'HABILITADO_INTERNO') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO_FUERA_DE_HORA",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
                console.log(response.body['estado'])
            })


        // ejecutar (re)programacion
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO_FUERA_DE_HORA') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "DESHABILITADO_PROGRAMADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
                console.log(response.body['estado'])
            })


        // <us2073> Continuar Programación 1: Ctos sin solicitud / Ptos sin confirmación -> Ctos con cortes de entrega -------------------------------------
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('cantidadSolicitada')
                expect(response.body[0]).to.have.property('nombrePunto')
                expect(response.body[0]).to.have.property('nroContrato')

                cy.request({
                    method: 'POST',
                    url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                    body: {
                        "estado": "DESHABILITADO_PROGRAMADO",
                        "fecha": date
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        

/*         // habilitar programacion (para re-ejecutar pb)
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO_PROGRAMADO') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        failOnStatusCode: false,
                        body: {
                            "estado": "HABILITADO",
                            "fecha": date
                        }
                    }).then((response) => {
                        if (response.status == 409) {
                            expect(response.status).to.eq(409)
                            expect(response.body).to.have.property('message')
                        } else {
                            expect(response.status).to.eq(200)
                        }
                    })
                } else {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('dia')
                    expect(response.body).to.have.property('estado')
                    expect(response.body).to.have.property('usuario')
                }
                console.log(response.body['estado'])
            })
 */        })
    })


// <us2212> Puntos sin confirmación --------------------------------------------------------

    it('[consulta <puntos sin confirmacion> <current date>] status200 & properties', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/?fecha=${tomorrow}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('cantidadSolicitada')
                expect(response.body[0]).to.have.property('nombrePunto')
                expect(response.body[0]).to.have.property('nroContrato')
            })
        })
    })


// <us2096> Continuar Programación 2: Ctos con cortes de entrega -> Excesos en contratos TI ----------------------------------------------------

    it('[consulta <contratos con corte a la entrega => excesos en contratos ti> <current date>] status 200', () => {
        cy.today().then((date) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/exceso-contratos-ti/?fechaInicial=${date}&fechaFinal=${date}&origen=proceso-batch`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).not.to.include('text/html')
            })
        })
    })


// <us2118> Contratos con corte a la entrega - Acción "Listar" ------------------------------------------------------------------

    it('[consulta <contratos con corte a la entrega => excesos en contratos ti> <current date>] status 200', () => {
        cy.today().then((date) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/contratos-corte-entrega/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).not.to.include('text/html')        
            })
        })
    })


// <us2207> Exportar Archivos - Puntos sin Confirmación ------------------------------------------------------------------

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/report?reportType=pdf&fecha=${tomorrow}`
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

    it('[report <xls>] status200, .xls doc', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/report?reportType=xls&fecha=${tomorrow}`
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
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/report?reportType=print&fecha=${tomorrow}`
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


// <us2202> Exportar Archivos - Puntos sin Solicitud ---------------------------------------------------------------------

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/report?reportType=pdf&fecha=${tomorrow}`
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

    it('[report <xls>] status200, .xls doc', () => {
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/report?reportType=xls&fecha=${tomorrow}`
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
        cy.tomorrow().then((tomorrow) => {
            cy.get('@jsession').request({
                method: 'GET',
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/report?reportType=print&fecha=${tomorrow}`
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

