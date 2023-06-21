/// <reference types="cypress"/>
import { PASS1, USER1 } from "../../../../fixtures/credentials"

describe('API tests <View Parametrizada> module', () => {  
    beforeEach(() => {
     cy.loginAPI(USER1, PASS1)
    })
    
    it('init - pantalla inicial - status 200', () => {
        cy.get('@jsession').then(token => {
            console.log(token)
            cy.request({
                method: 'GET',
                url: '/api/spac/control/viewparametrizada/init',
                headers: {
                    'Cookie': 'JSESSIONID='+token
                }
            })
            .then((response) => {
                // validate response have JSON format
                expect(response.headers['content-type']).to.not.eq('application/json')
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
            })
        })  
    })

    it('listar - status code 200', () => {
        cy.get('@jsession').then(token => {
            console.log(token)
            cy.request({
                method: 'GET',
                url: '/api/spac/control/viewparametrizada/listar?codigo=8&fechaDesde=2021-04-25&fechaHasta=2021-04-25&tipoDato=P&tipoVolumen=A&sort=volStdM3D,desc'
            })
            .then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                expect(response.status).to.eq(200)
            })
        })
    })

    it('listar - status 4xx parametros invalidos', () => {
            cy.request({
                method: 'GET',
                url: '/api/spac/control/viewparametrizada/listar?codigo=8&fechaDesde=2021-04-25&fechaHasta=2021-04-25&tipoDato=R&tipoVolumen=A&sort=volStdM3D,desc',
                failOnStatusCode: false
            }).then((response) => {
                // Realiza las aserciones sobre la respuesta de la API
                console.log(response.status)
                response.status.should.equal(400)
            })
        
    })
    // testing baseURL
    it('visitar website', () =>{
        cy.visit('/spac/control')
    })
})


// ARREGLAR LAS BASE URL Y LA ASERCION PARA STATUS CODE 400