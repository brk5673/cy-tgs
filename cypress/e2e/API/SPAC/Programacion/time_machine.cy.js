/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

    it('[estado programacion] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/common/date/offset',
            body: {
                "offset": "0"
            }
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })
})