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
    // cy.server().route('GET', `${API_URL}/articles`).as('getArticlesFirst')
    // cy.wait('@getArticlesFirst').its('status').should('equal', 200)
    cy.window().its('store').should('exist')
    cy.window()
      .its('store')
      .invoke('getState')
      .its('articles').should('exist')
  })

  it('has 1 main article on load', () => {
    cy.visit('/')
    // cy.server().route('GET', `${API_URL}/articles/1`).as('getArticleFirst')
    // cy.wait('@getArticleFirst').its('status').should('equal', 200)
    cy.window().its('store').should('exist')
    cy.window()
      .its('store')
      .invoke('getState')
      .its('article')
      .should('exist')
  })
})
