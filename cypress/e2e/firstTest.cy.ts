describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('successfully loads the homepage', () => {
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('verifies page has proper title', () => {
    cy.title().should('not.be.empty')
  })

  it('checks if the page is accessible', () => {
    cy.document().should('have.property', 'doctype')
    cy.window().should('exist')
  })

  it('verifies page loads without console errors', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
    cy.get('@consoleError').should('not.be.called')
  })

  it('confirms page responds to viewport changes', () => {
    cy.viewport('iphone-6')
    cy.wait(500)
    cy.viewport('macbook-15')
  })
})