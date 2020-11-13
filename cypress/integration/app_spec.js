const API_URL = 'https://dialog-blog.herokuapp.com'

describe('The App', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.request('GET', `${API_URL}/articles`, {})
  })
})
