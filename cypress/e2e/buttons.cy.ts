describe('Check button functionality', () =>{
    beforeEach(() =>{
        cy.visit(Cypress.env('BASE_URL'));
    });
    
    
    it('Checks forgot password button', () => {
    cy.contains('Forgot Password')
      .click();

    cy.url().should('eq', Cypress.env('Forgot_PW'));
  });


  it('should have the correct accessible name for the button', () => {

    cy.get('button[type="submit"]')
      .should('contain', 'Login')
      .and('be.visible')
  })
})