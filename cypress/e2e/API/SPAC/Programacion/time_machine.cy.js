/// <reference types="cypress"/>
import { PASS1, PASS3, USER1, USER3 } from "../../../../fixtures/credentials"

describe('API tests <Proceso Batch> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER3, PASS3)
    })

// set <cambio hora> ----------------------------------------------------------
    it.only('[set <cambiar hora>] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/common/date/offset',
            body: {
                "offset": 9999999999//999999//2549399 // 19 caracteres
            }
        })
        .then((response) => {
        })
    })

// reset <cambio hora> ----------------------------------------------------------
    it('[reset <cambiar hora>] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/common/date/offset',
            body: {
                "offset": 0
            }
        })
        .then((response) => {
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
        })
    })
})