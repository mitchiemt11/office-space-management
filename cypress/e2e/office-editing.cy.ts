describe('Office Editing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="office-card"]').first().click()
    cy.url().should('eq', 'http://localhost:5173/office/1')
    cy.get('[data-cy="edit-office-button"]').click()
    cy.url().should('eq', 'http://localhost:5173/office/1')
  })

  it('updates office information', () => {
    const newName = 'Updated Office'
    cy.get('input[placeholder="Office Name"]').clear().type(newName)
    cy.get('button').contains('UPDATE OFFICE').click()
    cy.url().should('eq', 'http://localhost:5173/office/edit/1')
    cy.get('[data-cy="office-name"]').first().should('contain', newName)
  })

  it('deletes an office', () => {
    cy.get('button').contains('DELETE OFFICE').click()
    cy.on('window:confirm', () => true)
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('changes office color', () => {
    cy.get('[data-cy="color-options"] button').last().click()
    cy.get('button').contains('UPDATE OFFICE').click()
  })
})
