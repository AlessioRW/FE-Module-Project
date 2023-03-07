
const { cypress_variables } = require('../cypress.config')
const baseUrl = cypress_variables.baseUrl
describe('all tests', () => {

  beforeEach(() => {
    cy.visit(baseUrl)
    const button = cy.get('[test-id="login-btn"]')
    if (button) {
      button.click()
      cy.wait(500)


      cy.origin('https://accounts.spotify.com', () => {
        cy.get('[data-testid="login-username"]').type('alessiowright@hotmail.com')
        cy.get('[data-testid="login-password"]').type('2yGXeMX8intHTHE')
        cy.get('[data-testid="login-button"]').click()
        cy.wait(500)
      })
    }
  })


  it('Home Page', () => {
    //heading
    cy.get('[test-id="name-heading"]').should('have.text', 'Alessio')

    //top songs and aritsts
    cy.get('[test-id="top-songs"]').should('have.length', 5)
    cy.get('[test-id="top-artists"]').should('have.length', 5)

    //info changes on button click
    const songsShort = []
    cy.get('[test-id="top-songs"]').each((song) => { songsShort.push(song[0].textContent) })

    cy.get('[test-id="long-term-btn"]').click()
    cy.wait(500)

    const songsLong = []
    cy.get('[test-id="top-songs"]').each((song) => { songsLong.push(song[0].textContent); })

    expect(songsShort).to.not.eq(songsLong)
  })

  it.only('Popularity', () => {
    cy.wait(500)
    cy.get('[test-id="popularity-link"]').click()
    cy.wait(500)

    //popularity number falls between 0 to 100
    cy.get('[test-id="popularity-number"]').invoke('text').then(parseInt).should('be.gt',0)
    cy.get('[test-id="popularity-number"]').invoke('text').then(parseInt).should('be.lt',100)


    //songs chnage after button click
    const songsShort = []
    cy.get('[test-id="most-popular"]').each((song) => { songsShort.push(song[0].textContent) })

    cy.get('[test-id="long-term-btn"]').click()
    cy.wait(500)

    const songsLong = []
    cy.get('[test-id="most-popular"]').each((song) => { songsLong.push(song[0].textContent); })

    expect(songsShort).to.not.eq(songsLong)
  })
})