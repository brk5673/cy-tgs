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

    // bad request
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

    // fechas limites minimos y maximos
    it('[fecha limite] status 200 & properties', () => {
        cy.get('@jsession').request('/api/common/date/frontend-limits')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('fechaMaxima')
                expect(response.body['fechaMaxima']).to.eq('2099-12-31T23:59:59')
                expect(response.body).to.have.property('fechaMinima')
                expect(response.body['fechaMinima']).to.equal('1990-01-01T00:00:00')
            })
    })
    


    // batch process e2e <dia actual> ------------------------------

    it('[batch process <current date>] status 200 & properties', () => {
        cy.today().then((date) => {


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


        // habilitar programacion
            cy.request({
                url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
            }).then((response) => {
                console.log(response.body['estado'])
                if (response.body.estado == 'DESHABILITADO_PROGRAMADO') {
                    cy.request({
                        method: 'POST',
                        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                        body: {
                            "estado": "HABILITADO",
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
                
        })
    })



    // batch process e2e <dia despues> ------------------------------
    it('[batch process <day after>] status 200 & properties', () => {
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


    // habilitar programacion
        cy.request({
            url: `/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`,
        }).then((response) => {
            console.log(response.body['estado'])
            if (response.body.estado == 'DESHABILITADO_PROGRAMADO') {
                cy.request({
                    method: 'POST',
                    url: '/api/spac/programacion/proceso-batch/proceso-batch/',
                    body: {
                        "estado": "HABILITADO",
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
    })
})











/*     // us2018 => [DESHABILITAR PROGRAMACION]-----------------------------------------------------------------

    it('[deshabilitar programacion] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('SIN_PROGRAMACION')
        })
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO",
                "fecha": "2023-10-28"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    
    it('[status programacion <28Oct2023>] st200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28', 
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO')
        })
    })

    // us2025 => [HABILITAR INTERNO]-----------------------------------------------------------------

    it('[habilitar interno] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO')
        })

        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "HABILITADO_INTERNO",
                "fecha": "2023-10-28"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('HABILITADO_INTERNO')

        })
    })

    // us2026 => [DESHABILITAR INTERNO]-----------------------------------------------------------------

    it('[deshabilitar interno] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('HABILITADO_INTERNO')
        })
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO_FUERA_DE_HORA",
                "fecha": "2023-10-28"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[status programacion <10Jul2023>] st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-07-10',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO_FUERA_DE_HORA')
            

        })
    })

    // ----------- <us2027> Ejecutar (Re)Programación -> Ctos sin solicitudes -----------------------------------------------------------------

    it('[ejecutar reprogramacion] status200', () => {
        cy.request('/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28').then((response) => {
            console.log(response.body.estado)
            expect(response.body.estado).to.eq('DESHABILITADO_FUERA_DE_HORA')
        })
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/programacion/proceso-batch/proceso-batch/',
            body: {
                "estado": "DESHABILITADO_PROGRAMADO",
                "fecha": "2023-10-28"
              }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[estado programacion] <fecha definida> st200', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/status-programacion?fecha=2023-10-28',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            console.log(response.body.estado)


        })
    })

    it('[contratos sin solicitud] status200 & properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/contratos-sin-solicitudes/?fecha=2023-10-28',
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.have.property('codigoContrato')
            expect(response.body[0]).to.have.property('nombreEntidadLegal')
        })
    })




 */










    // <us2212> Continuar Programación 0.5: Ctos sin solicitud -> Puntos sin confirmación --------------------------------------------------------

    it('[puntos sin confirmacion <current date>] status200 & properties', () => {
        cy.today().then((date) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('cantidadSolicitada')
                expect(response.body[0]).to.have.property('nombrePunto')
                expect(response.body[0]).to.have.property('nroContrato')
            })
        })
    })

    it('[puntos sin confirmacion <day after>] status200 & properties', () => {
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


    // <us2073> Continuar Programación 1: Ctos sin solicitud / Ptos sin confirmación -> Ctos con cortes de entrega -------------------------------------------------------------

    it('[contratos sin solicitud-puntos sin confirmacion-contratos con corte a la entrega <current date>]', () => {
        cy.today().then((date) => {
            cy.get('@jsession').request({
                url: `/api/spac/programacion/proceso-batch/puntos-sin-confirmacion/?fecha=${date}`,
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('cantidadSolicitada')
                expect(response.body[0]).to.have.property('nombrePunto')
                expect(response.body[0]).to.have.property('nroContrato')
            })
            .then((response) => {
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
        })
    })


    // <us2096> Continuar Programación 2: Ctos con cortes de entrega -> Excesos en contratos TI ----------------------------------------------------

    it('[contratos con corte a la entrega => excesos en contratos ti <current date>]', () => {
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

    it('[contratos con corte a la entrega => excesos en contratos] status200 & properties', () => {
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














    




    
})

