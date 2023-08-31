// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForDownload', () => {
  cy.wait(5000) // Espera 5 segundos para asegurarte de que la descarga esté completa
})

Cypress.Commands.add('getLastDownload', () => {
  return cy.exec('ls -Art ~/Downloads | tail -n 1').its('stdout').then((filename) => { // Cambia "~/Downloads" por la ruta de tu carpeta de descargas
    return filename.trim()
  })
})

//cypress command login
Cypress.Commands.add('loginAPI', (username, password) => {
  cy.request('POST', '/api/user/login', {
    username, password
  }).then((response) => {
    let token = response.headers["set-cookie"][0].split("=")[1].split(";")[0]
    cy.wrap(token).as("jsession")
  });

})

// cypress command logout
Cypress.Commands.add('logoutAPI', () => {
  cy.request('POST', '/api/user/logout').then((response) => {
    expect(response.status).to.eq(200)
  });
})

// cypress command get date
Cypress.Commands.add('today', () => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0'); // PadStart agrega un 0 si tiene un solo dígito
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // PadStart agrega un 0 si tiene un solo dígito
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
})

Cypress.Commands.add('tomorrow', () => {
  const date = new Date();
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);

  const day = tomorrow.getDate().toString().padStart(2, '0'); // PadStart agrega un 0 si tiene un solo dígito
  const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0'); // PadStart agrega un 0 si tiene un solo dígito
  const year = tomorrow.getFullYear();

  return `${year}-${month}-${day}`;
});


Cypress.Commands.add('importEDI', () => {
  cy.request({
    method: 'POST',
    url: '/api/spac/solicitudEdi/importEdi',
    body: 
        [
            {
                "solicitudDto": {
                    "fechaInicial": "31/08/2023",
                    "fechaFinal": "31/08/2023",
                    "codigoContrato": "ED044",
                    "entidadLegal": "PAN AMERICAN ENERGY S.L. SUC. ARGEN",
                    "numeroSolicitud": null,
                    "estado": null,
                    "tipo": "M",
                    "dias": 2,
                    "usuario": "jdinesta",
                    "ultimaModificacion": "",
                    "version": 0,
                    "puntosRecepcion": [
                        {
                            "numeroPunto": 9510,
                            "nombrePunto": " TRANSF CHU/BBL TF248 AL ED44 PAE",
                            "codigoZona": "BBL",
                            "nombreZona": null,
                            "rolPunto": "Recepción",
                            "prioridadPunto": 6,
                            "referenciaAAAA": "PETPAECPR7P3",
                            "cantidad": 500000,
                            "cantidadConfirmada": null,
                            "cantidadConfirmadaRecepcion": null,
                            "cantidadConfirmadaEntrega": null
                        }
                    ],
                    "puntosEntrega": [
                        {
                            "numeroPunto": 1901,
                            "nombrePunto": "TRANSF. ED044 PAE-TF VARIOS NQN DESDE BBL.",
                            "codigoZona": "NQN",
                            "nombreZona": null,
                            "rolPunto": "Entrega",
                            "prioridadPunto": 6,
                            "referenciaAAAA": "PETPAECPR7P3",
                            "cantidad": 500000,
                            "cantidadConfirmada": null,
                            "cantidadConfirmadaRecepcion": null,
                            "cantidadConfirmadaEntrega": null
                        }
                    ],
                    "caminos": [
                        {
                            "tipoCamino": "Normal",
                            "codigoZonaRecepcion": "BBL",
                            "nombreZonaRecepcion": "Bahía Blanca",
                            "prioridadRecepcion": 1,
                            "cantidadRecepcion": 500000,
                            "codigoZonaEntrega": "NQN",
                            "nombreZonaEntrega": "Neuquén",
                            "prioridadEntrega": 1,
                            "cantidadEntrega": 500000,
                            "cantidadFuel": 0,
                            "porcentajeFuel": 0.0,
                            "cmd": null
                        }
                    ],
                    "zonasPuntosRecepcion": [],
                    "zonasPuntosEntrega": [],
                    "editable": null,
                    "borrable": null
                },
                "results": "",
                "deshabilitar": false,
                "withConfirmation": false
            },
            {
                "solicitudDto": {
                    "fechaInicial": "30/08/2023",
                    "fechaFinal": "30/08/2023",
                    "codigoContrato": "ED072",
                    "entidadLegal": "ENERGY CONSULTING SERVICES S.A.",
                    "numeroSolicitud": null,
                    "estado": null,
                    "tipo": "M",
                    "dias": 2,
                    "usuario": "jdinesta",
                    "ultimaModificacion": "",
                    "version": 0,
                    "puntosRecepcion": [
                        {
                            "numeroPunto": 19172,
                            "nombrePunto": "TRANSF TDF/GBA TF-318 LITORAL AL ED-072 ECS",
                            "codigoZona": "GBA",
                            "nombreZona": null,
                            "rolPunto": "Recepción",
                            "prioridadPunto": 2,
                            "referenciaAAAA": "ECS-LG-SWAP",
                            "cantidad": 45000,
                            "cantidadConfirmada": null,
                            "cantidadConfirmadaRecepcion": null,
                            "cantidadConfirmadaEntrega": null
                        }
                    ],
                    "puntosEntrega": [
                        {
                            "numeroPunto": 248,
                            "nombrePunto": "CAMARA BRAGADO-25 DE MAYO",
                            "codigoZona": "BUE",
                            "nombreZona": null,
                            "rolPunto": "Entrega",
                            "prioridadPunto": 1,
                            "referenciaAAAA": "ECSARDION",
                            "cantidad": 45000,
                            "cantidadConfirmada": null,
                            "cantidadConfirmadaRecepcion": null,
                            "cantidadConfirmadaEntrega": null
                        }
                    ],
                    "caminos": [
                        {
                            "tipoCamino": "Normal",
                            "codigoZonaRecepcion": "GBA",
                            "nombreZonaRecepcion": "Gran Buenos Aires",
                            "prioridadRecepcion": 15,
                            "cantidadRecepcion": 45000,
                            "codigoZonaEntrega": "BUE",
                            "nombreZonaEntrega": "Buenos Aires",
                            "prioridadEntrega": 16,
                            "cantidadEntrega": 45000,
                            "cantidadFuel": 0,
                            "porcentajeFuel": 0.0,
                            "cmd": null
                        }
                    ],
                    "zonasPuntosRecepcion": [],
                    "zonasPuntosEntrega": [],
                    "editable": null,
                    "borrable": null
                },
                "results": "",
                "deshabilitar": false,
                "withConfirmation": false
            }
        ]
    
  })
})

// cypress commands post request cargar Solicitudes EDI
Cypress.Commands.add('addSolicitudesEDI1', (method, url, body) => {
  cy.request({
    method: 'POST',
    url: '/api/spac/solicitudEdi/saveLote',
    body: 
      [
        {
          "solicitudDto":{
            "fechaInicial":"31/08/2023",
            "fechaFinal":"31/08/2023",
            "codigoContrato":"ED044","entidadLegal":"PAN AMERICAN ENERGY S.L. SUC. ARGEN","numeroSolicitud":null,"estado":null,"tipo":"M","dias":2,"usuario":"jdinesta","ultimaModificacion":"","version":0,
            "puntosRecepcion":[{
              "numeroPunto":9510,"nombrePunto":" TRANSF CHU/BBL TF248 AL ED44 PAE","codigoZona":"BBL","nombreZona":null,"rolPunto":"Recepción","prioridadPunto":6,"referenciaAAAA":"PETPAECPR7P3","cantidad":500000,"cantidadConfirmada":null,"cantidadConfirmadaRecepcion":null,"cantidadConfirmadaEntrega":null
            }],
            "puntosEntrega":[{
              "numeroPunto":1901,"nombrePunto":"TRANSF. ED044 PAE-TF VARIOS NQN DESDE BBL.","codigoZona":"NQN","nombreZona":null,"rolPunto":"Entrega","prioridadPunto":6,"referenciaAAAA":"PETPAECPR7P3","cantidad":500000,"cantidadConfirmada":null,"cantidadConfirmadaRecepcion":null,"cantidadConfirmadaEntrega":null
            }],
            "caminos":[{
              "tipoCamino":"Normal","codigoZonaRecepcion":"BBL","nombreZonaRecepcion":"Bahía Blanca","prioridadRecepcion":1,"cantidadRecepcion":500000,"codigoZonaEntrega":"NQN","nombreZonaEntrega":"Neuquén","prioridadEntrega":1,"cantidadEntrega":500000,"cantidadFuel":0,"porcentajeFuel":0,"cmd":null
            }],
            "zonasPuntosRecepcion":[],
            "zonasPuntosEntrega":[],
            "editable":null,"borrable":null
          },
          "results":"","deshabilitar":false,"withConfirmation":false,"checked":true
        }
      ]
  })
})

Cypress.Commands.add('addSolicitudesEDI2', (method, url, body) => {
  cy.request({
    method: 'POST',
    url: '/api/spac/solicitudEdi/saveLote',
    body: 
      [{"solicitudDto":{"fechaInicial":"31/08/2023","fechaFinal":"31/08/2023","codigoContrato":"ED044","entidadLegal":"PAN AMERICAN ENERGY S.L. SUC. ARGEN","numeroSolicitud":null,"estado":null,"tipo":"M","dias":2,"usuario":"jdinesta","ultimaModificacion":"","version":0,"puntosRecepcion":[{"numeroPunto":9510,"nombrePunto":" TRANSF CHU/BBL TF248 AL ED44 PAE","codigoZona":"BBL","nombreZona":null,"rolPunto":"Recepción","prioridadPunto":6,"referenciaAAAA":"PETPAECPR7P3","cantidad":500000,"cantidadConfirmada":null,"cantidadConfirmadaRecepcion":null,"cantidadConfirmadaEntrega":null}],"puntosEntrega":[{"numeroPunto":1901,"nombrePunto":"TRANSF. ED044 PAE-TF VARIOS NQN DESDE BBL.","codigoZona":"NQN","nombreZona":null,"rolPunto":"Entrega","prioridadPunto":6,"referenciaAAAA":"PETPAECPR7P3","cantidad":500000,"cantidadConfirmada":null,"cantidadConfirmadaRecepcion":null,"cantidadConfirmadaEntrega":null}],"caminos":[{"tipoCamino":"Normal","codigoZonaRecepcion":"BBL","nombreZonaRecepcion":"Bahía Blanca","prioridadRecepcion":1,"cantidadRecepcion":500000,"codigoZonaEntrega":"NQN","nombreZonaEntrega":"Neuquén","prioridadEntrega":1,"cantidadEntrega":500000,"cantidadFuel":0,"porcentajeFuel":0,"cmd":null}],"zonasPuntosRecepcion":[],"zonasPuntosEntrega":[],"editable":null,"borrable":null},"results":"1 - Advertencia - Se va a reemplazar la solicitud dentro de hora Nro. 11395 Confirme la importación por favor.\n","deshabilitar":false,"withConfirmation":true,"checked":true}]      
  })
})


Cypress.Commands.add('deshabilitarPB', () => {
  cy.today().then((date) => {
    cy.request(`/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`).then((response) => {
      expect(response.body.estado).to.eq('SIN_PROGRAMACION')
    })
    cy.get('@jsession').request({
        method: 'POST',
        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
        body: {
            "estado": "DESHABILITADO",
            "fecha": date,
        }
    })
  })
})

Cypress.Commands.add('ejecutarPB', () => {
  cy.today().then((date) => {
    cy.request(`/api/spac/programacion/proceso-batch/status-programacion?fecha=${date}`).then((response) => {
      expect(response.status).to.eq(200)
    })
    cy.get('@jsession').request({
        method: 'POST',
        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
        body: {
            "estado": "DESHABILITADO_PROGRAMADO",
            "fecha": date
          }
    })
  })
})

Cypress.Commands.add('deshabilitarPBtomorrow', () => {
  cy.tomorrow().then((tomorrow) => {
    cy.request(`/api/spac/programacion/proceso-batch/status-programacion?fecha=${tomorrow}`).then((response) => {
      expect(response.status).to.eq(200)
    })
    cy.get('@jsession').request({
        method: 'POST',
        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
        body: {
            "estado": "DESHABILITADO",
            "fecha": tomorrow
          }
    })
  })
})

Cypress.Commands.add('ejecutarPBtomorrow', () => {
  cy.tomorrow().then((tomorrow) => {
    cy.request(`/api/spac/programacion/proceso-batch/status-programacion?fecha=${tomorrow}`).then((response) => {
      expect(response.status).to.eq(200)
    })
    cy.get('@jsession').request({
        method: 'POST',
        url: '/api/spac/programacion/proceso-batch/proceso-batch/',
        body: {
            "estado": "DESHABILITADO_PROGRAMADO",
            "fecha": tomorrow
          }
    })
  })
})