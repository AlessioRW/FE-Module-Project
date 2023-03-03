
const { cypress_variables } = require('../cypress.config')
const baseUrl = cypress_variables.baseUrl
describe('all tests', () => {

  beforeEach(() => {
    cy.visit(baseUrl)
    const button = cy.get('[test-id="login-btn"]')
    if (button) {
      button.click()
      cy.wait(1500)


      cy.origin('https://accounts.spotify.com', () => {
        cy.get('[data-testid="login-username"]').type('alessiowright@hotmail.com')
        cy.get('[data-testid="login-password"]').type('2yGXeMX8intHTHE')
        cy.get('[data-testid="login-button"]').click()
        cy.wait(1000)
      })
    }
  })


  it('Home Page', () => {
    cy.get('[test-id="name-heading"]').should('have.text', 'Alessio')

    cy.get('[test-id="top-songs"]').should('have.length', 5)
    cy.get('[test-id="top-artists"]').should('have.length', 5)

  })

})