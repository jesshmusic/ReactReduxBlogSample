const API_URL = 'https://dialog-blog.herokuapp.com'

describe('The App', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.request('GET', `${API_URL}/articles`, {})
  })
})

describe('The Main Page Content', () => {
  before(() => {
    cy.visit('/')
  })
  it('has 20 article teases', () => {
    cy.get('.ArticleTease').should('have.length', 20)
  })
})

describe('The Redux store', () => {
  it('has articles state on load', () => {
    cy.visit('/')
    cy.window().its('store').should('exist')
    cy.window()
      .its('store')
      .invoke('getState')
      .its('articles').should('exist')
  })

  it('has 1 main article on load', () => {
    cy.visit('/')
    cy.window().its('store').should('exist')
    cy.window()
      .its('store')
      .invoke('getState')
      .its('article')
      .should('exist')
  })
})

describe('The Article', () => {
  it('switches to edit mode', () => {
    cy.visit('/')
    cy.get('.btn.btn-info').click()
    cy.get('#ArticleEditForm').should('exist')
  })
  it('switches back to read mode', () => {
    cy.get('.btn.btn-warning').click()
    cy.get('#ArticleEditForm').should('not.exist')
  })
  it('switches to create mode', () => {
    cy.visit('/')
    cy.get('.btn.btn-success').click()
    cy.get('#ArticleCreateForm').should('exist')
  })
  it('switches back to read mode', () => {
    cy.get('.btn.btn-warning').click()
    cy.get('#ArticleCreateForm').should('not.exist')
  })
})
