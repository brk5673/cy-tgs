/// <reference types="cypress"/>
import { PASS2, USER2 } from "../../../../fixtures/credentials"

describe('API tests <Provision> module', () => {
    beforeEach(() => {
        cy.loginAPI(USER2, PASS2)
    })

    it('[pedidos a provisionar] status code 200, response properties', () => {
        cy.get('@jsession').request({
            method: 'GET',
            url: '/api/spac/facturacion/provision/periodosAProvisionar',
        })
        .then((response) => {
            // validate response have JSON format
            expect(response.headers['content-type']).to.not.eq('application/json')
            // Realiza las aserciones sobre la respuesta de la API
            expect(response.status).to.eq(200)
            // response to have property 'gasoductos'
            expect(response.body).to.not.equal(0)
        })
    })


   /*  it('[reporte <pdf>] status 200', () => {
        cy.get('@jsession').request({
            method: 'POST',
            url: '/api/spac/facturacion/provision/generarReporte',
            body: {
                "errores": {
                  "lista": [
                    {
                      "atributosExtra": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                      },
                      "descripcion": "string",
                      "id": 0,
                      "tipoError": "ERROR"
                    }
                  ]
                },
                "itemsAperturaImpositiva": [
                  {
                    "camino": "string",
                    "caminoCorto": "string",
                    "catIva": "string",
                    "codigoSociedad": "string",
                    "comprobante": "string",
                    "contrato": "string",
                    "entidadLegal": "string",
                    "fecha": "string",
                    "oferta": "string",
                    "provincia": "string",
                    "provinciaIngresosBrutos": "string",
                    "provinciaIva": "string",
                    "provinciaPercepcionIngresosBrutos": "string",
                    "ruta": "string",
                    "signo": "string",
                    "tipoMercado": "string",
                    "volumen": 0,
                    "zonaEntrega": "string",
                    "zonaOrigen": "string",
                    "zonaRecepcion": "string"
                  }
                ],
                "itemsOriginal": [
                  {
                    "camino": "string",
                    "caminoCorto": "string",
                    "codigoContrato": "string",
                    "codigoRuta": "string",
                    "codigoSigno": "string",
                    "codigoSociedad": "string",
                    "codigoZonaEntrega": "string",
                    "codigoZonaOrigen": "string",
                    "codigoZonaRecepcion": "string",
                    "comprobante": "string",
                    "fecha": "string",
                    "numeroEntidadLegal": "string",
                    "oferta": "string",
                    "tipoMercado": "string",
                    "volumen": 0
                  }
                ],
                "periodo": "2022/09"
              }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            //expect response headers contain value file.pdf
            expect(response.headers['content-disposition']).to.contain('.pdf')
        })
    

    })
 */


















})