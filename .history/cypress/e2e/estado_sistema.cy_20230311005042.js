describe('Manu, pantalla, carga inicial', () => {
  it('habilitacion de acceso', () => {
    cy.visit('http://10.1.11.237:8080/etgs/login')
    cy.get('input[name="userName"]').type('gpalladi')
    cy.get('input[name="password"]').type('Independiente1_')
    cy.get('button[type="submit"]').click()
    cy.contains('span.MuiListItemText-primary', 'SPAC').click()
    cy.contains('span.MuiListItemText')
    cy.contains('span.MuiListItemText-primary', 'Estado del sistema').click()})
})

/* describe('Login Test', () => {
    it('Visits the login page and logs in', () => {
      // Visitar la página de login
      cy.visit('http://10.1.11.237:8080/etgs/login')
  
      // Ingresa las credenciales de usuario y contraseña
      cy.get('input[name="username"]').type('tu-usuario')
      cy.get('input[name="password"]').type('tu-contraseña')
  
      // Hacer clic en el botón de iniciar sesión
      cy.get('button[type="submit"]').click()
    })
}) */