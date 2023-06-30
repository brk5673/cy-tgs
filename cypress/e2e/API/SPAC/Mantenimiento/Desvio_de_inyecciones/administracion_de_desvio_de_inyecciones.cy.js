/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../../fixtures/credentials"

describe('API tests <Administracion de Desvio de Inyecciones> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER1, PASS1)
    })

    it('[init] <PUNTOS PARA MAPO> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'gasoductos'
            expect(response.body).to.have.property('gasoductos')
        })
    })

    it('[listar] <PUNTOS PARA MAPO> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })

    it('[grabar - agregar nuevo] <PUNTOS PARA MAPO> status 2xx=Created', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/',
            body: {
                "idGasoducto": "500",
                "nroPunto": 1,
                "idAgrupamiento": "800",
                "mapoDefinida": 6,
                "idVariableCost": "658198557/313318024/15512782"
            }
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(201)
        })
    })

    it('[grabar - editar] <PUNTOS PARA MAPO> status 2xx', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/',
        })
        .then((response) => {
            const id0 = response.body[0].id

            cy.request({
                method: 'PUT',
                url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/',
                body: {
                    "id": id0,
                    "idGasoducto": "500",
                    "nroPunto": 1,
                    "idAgrupamiento": "800",
                    "mapoDefinida": 10, // valor a modificar
                    "idVariableCost": "658198557/313318024/15512782"
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(204)
            })
        })
    })


    it('[grabar - delete] <PUNTOS PARA MAPO> status 2xx', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/',
        })
        .then((response) => {
            // guardar id
            const id0 = response.body[0].id

            cy.request({
                method: 'DELETE',
                url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-mapo/' + id0,
            })
            .then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })







// -----------------------------------------------------------------------------------------------------------------------

    it('[init] <UMBRAL POR OPERADOR> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'gasoductos'
            expect(response.body).to.have.property('gasoductos')
        })
    })

    it('[listar] <UMBRAL POR OPERADOR> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })  

    it('[grabar - agregar nuevo] <UMBRAL POR OPERADOR> status 2xx=Created', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/',
            body: {
                "idGasoducto": "500",
                "idOperadorRelacionado": 684,
                "volumenM3d": 11
            }
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(201)
        })
    })

    it('[grabar - editar] <UMBRAL POR OPERADOR> status 2xx', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/',
        })
        .then((response) => {
            const id0 = response.body[0].id

            cy.request({
                method: 'PUT',
                url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/',
                body: {
                    "id": id0,
                    "idGasoducto": "500",
                    "idOperadorRelacionado": 684,
                    "volumenM3d": 1.6 // valor a modificar
                    }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(204)
            })
        })
    })

    it('[grabar - delete] <UMBRAL POR OPERADOR> status 2xx', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/',
        })
        .then((response) => {
            // guardar id
            const id0 = response.body[0].id

            cy.request({
                method: 'DELETE',
                url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/umbral-por-operador/' + id0,
            })
            .then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })







// -----------------------------------------------------------------------------------------------------------------------

    it('[listar] <NOTAS DE DESVIO> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/notas-desvio/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })

    it('[grabar - editar] <NOTAS DESVIO> status 2xx', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/notas-desvio/',
        })
        .then((response) => {
            const id0 = response.body.nota1ConSuperacion

            cy.request({
                method: 'PATCH',
                url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/notas-desvio/',
                body:     {
                    "nota1SinSuperacion": {
                        "nota": "*pruebaBack*                        DESVIO DE INYECCIÓN SIN SUPERACIÓN DE MAPOS\n\nFecha:<fecha_actual>                                        Hora:<hora_actual>\n\nNos dirigimos a Ud. con relación a la inyección de gas natural en el Sistema de Transporte de TGS y a los efectos de hacerle saber que, del análisis de las proyecciones de inyección al Sistema de Transporte de TGS extraído de nuestro sistema SPAC para la hora <hora> surge un exceso de inyección en el/los <numero_de_los_puntos> para el día operativo <dia_operativo> según el siguiente detalle:\n\n<LISTA_DE_PUNTOS>\n\nTotal exceso<sumatoria_diferencia>m3/d. @ 9300 KCal.\n\nConsecuentemente, y de acuerdo a las facultades e instrucciones reconocidas por el Enargas en su nota \"ENRG GT/GAL/I N°01182\" del 06 de Febrero de 2009, y lo notificado por esta Transportista en su nota DAL 0635/09 de fecha 11/03/2009; ese Operador Relacionado deberá ajustar estrictamente el caudal inyectado al volumen programado por TGS para el día de la fecha. A la par le informamos que en el marco del Procedimiento arriba citado se está dando debida participación a ENARGAS y Secretaría de Energía a través de la notificación correspondiente.\n\nAtentamente,\n<nombre_apellido_usuario>"
                    
                    },
                }
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(204)
            })
        })
    })












// -----------------------------------------------------------------------------------------------------------------------

    it('[init] <PUNTOS EXCEPTUADOS> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/init',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })

    it('[listar] <PUNTOS EXCEPTUADOS> status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })

    it('[grabar - agregar nuevo] <PUNTOS EXCEPTUADOS> status 2xx=Created', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/',
            body: {
                "numero": 1
            }
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(201)
        })
    })

    it('[grabar - delete] <PUNTOS EXCEPTUADOS> status 2xx', () => {
        cy.get('@jsession').request({
            url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/',
        })
        .then((response) => {
            // guardar id
            const id0 = response.body[0].numero

            cy.request({
                method: 'DELETE',
                url: '/api/spac/mantenimiento/desvio-inyeccion/administracion/puntos-exceptuados/' + id0,
            })
            .then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })










})
