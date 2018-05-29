// Hestia Web
// Cypress tests file for front-end tests

describe('Front End', function () {
  it('.should() - assert that <title> is correct', function () {

    cy.visit('././index.html')
    cy.title().should('include', 'Hestia')
  })
})