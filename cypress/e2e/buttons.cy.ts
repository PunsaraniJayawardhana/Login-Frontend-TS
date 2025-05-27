describe('Check button functionality', () =>{
    beforeEach(() =>{
        cy.visit('/login');
    });
    
    
    it('Checks forgot password button', () => {
    cy.contains('Forgot Password')
      .click();

    cy.url();
  });


  it('should have the correct accessible name for the button', () => {

    cy.get('button[type="submit"]')
      .should('contain', 'Login')
      .and('be.visible')
  })
})