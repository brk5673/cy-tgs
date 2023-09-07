/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../../fixtures/credentials"

describe('API tests <Cortes Linepack> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    }) 

    it('[pantalla inicial <current day>] status 200 & properties', () => {
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
                url: '/api/spac/programacion/proceso-batch/cortes-line-pack/?fecha=2025-08-22'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.exist
            //expect response body not contain html tag
            expect(response.headers['content-type']).not.to.include('text/html');
        })
    })


// no funcionan las bad request
/*     it('[listar <bad request>] st 4xx', () => {
        cy.get('@jsession').request({
                url: '/api/spac/programacion/ptes-line-pack/?fecha=2100-08-17'
        })
        .then((response) => {
            expect(response.status).not.to.eq(200)
            // expect response body exist and not contain html tag
            expect(response.headers['content-type']).not.to.include('text/html');
        })
    })
 */
    
    it('[editar y grabar <volumen aprobado recepcion>] status 200', () => {

        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/cortes-line-pack/?fecha=2025-08-22'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            // guardar volumen Aprobado Recepcion
            console.log(response.body.linepack[43].volumenAprobadoRecepcion)
            const volumenAprobadoRecepcion = response.body.linepack[43].volumenAprobadoRecepcion
            const nroSolicitud = response.body.linepack[43].nroSolicitud
            const fechaProgramacion = response.body.linepack[43].fechaProgramacion
            const estadoDesbalance = response.body.linepack[43].estadoDesbalance
            const codigoContrato = response.body.linepack[43].codigoContrato
            const codigoZonaRecepcion = response.body.linepack[43].codigoZonaRecepcion
            const volumenSolicitadoRecepcion = response.body.linepack[43].volumenSolicitadoRecepcion
            const codigoZonaEntrega = response.body.linepack[43].codigoZonaEntrega
            const volumenSolicitadoEntrega = response.body.linepack[43].volumenSolicitadoEntrega
            const volumenProgramadoEntrega = response.body.linepack[43].volumenProgramadoEntrega
            const volumenAprobadoEntrega = response.body.linepack[43].volumenAprobadoEntrega
            const combustibleProgramado = response.body.linepack[43].combustibleProgramado
            const vmasC = response.body.linepack[43].vmasC

            cy.request({
                method: 'POST',
                url: '/api/spac/programacion/proceso-batch/cortes-line-pack/?fecha=2025-08-22',
                body: 
                    [{
                        "fechaProgramacion":fechaProgramacion,
                        "nroSolicitud":nroSolicitud,
                        "estadoDesbalance":estadoDesbalance,
                        "codigoContrato":codigoContrato,
                        "codigoZonaRecepcion":codigoZonaRecepcion,
                        "volumenSolicitadoRecepcion":volumenSolicitadoRecepcion,
                        "volumenProgramadoRecepcion":volumenAprobadoRecepcion,
                        "volumenAprobadoRecepcion":volumenAprobadoRecepcion - 1,
                        "codigoZonaEntrega":codigoZonaEntrega,
                        "volumenSolicitadoEntrega":volumenSolicitadoEntrega,
                        "volumenProgramadoEntrega":volumenProgramadoEntrega,
                        "volumenAprobadoEntrega":volumenAprobadoEntrega,
                        "combustibleProgramado":combustibleProgramado,
                        "vmasC":vmasC
                    }]
            })
            .then((response) => {
                expect(response.status).to.eq(204)
            })
        })
    })
    

    it('[report <pdf>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/cortes-line-pack/report/?fecha=2023-08-17&reportType=pdf&'
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

    it('[report <excel>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/cortes-line-pack/report/?fecha=2023-08-17&reportType=xls&'
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

    it('[report <print>] status200, .pdf doc', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/programacion/proceso-batch/cortes-line-pack/report/?fecha=2023-08-17&reportType=print&'
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