/// <reference types="cypress"/>

export {}
describe('Feeds Page', () => {
  it('Should route to the feeds page', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Logo')
  })

  it('Should create post modal onClick', () => {
    cy.visit('/')
    cy.get('input').click()
    cy.get('form')
      .should('exist')
      .findByRole('button')
      .findByTestId('channel')
      .click()
  })

  it('Should find and select a channel', () => {
    cy.findByTestId('select-options').find('li').click()
  })
})

describe('Feed Content', () => {
  it('Create post', () => {
    cy.findByPlaceholderText(/Whats happening ?/i).type(
      'This is my first post from cypress. I think its awesome'
    )
  })

  it('Submit post', () => {
    cy.findByRole('button', { name: /post/i }).click()
  })
})
