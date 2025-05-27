import strings from "../../auth_test/constants/constant";
import inputs from "../../auth_test/data/input";

describe('Login Page Test', () => { 
  beforeEach(() => {
   cy.visit('/login');
   cy.wait(1000);
  });


  it('Checks texts', () => {
    cy.get('h2').should('be.visible');
    cy.get('.text-sm').should('be.visible');
  });


  it('Checks input fields', () => {
    cy.get('[data-testid="Email Address"]')
      .type(inputs.correct_email)
      .should('have.value', inputs.correct_email);

    cy.get('[data-testid="password"]')
      .type(inputs.correct_password)
      .should('have.value',inputs.correct_password);
  });

  
  it('Checks the login button', () => {
    cy.get('button[type="submit"]')
      .should('contain', 'Login')
      .and('be.visible')
      .and('not.be.disabled'); 
  });


  it('Empty field input', () => {
    cy.get('button[type="submit"]').click();
    cy.contains(strings.empty_email).should('exist');
    cy.contains(strings.empty_password).should('exist');
  });


  it('Invalid email input', () => {
    cy.get('[data-testid="Email Address"]').type(inputs.invalid_email);
    cy.get('[data-testid="password"]').click();
    cy.contains(strings.invalid_email).should('exist');
  });


  it('Logins successfully with correct credentials', () => {
    cy.get('[data-testid="Email Address"]').type(inputs.correct_email);
    cy.get('[data-testid="password"]').type(inputs.correct_password);
    cy.get('button[type="submit"]').click();
    cy.url();
    cy.wait(10000);
  });


  it('Shows error on incorrect credentials', () => {
    cy.get('[data-testid="Email Address"]').type(inputs.correct_email);
    cy.get('[data-testid="password"]').type(inputs.incorrect_PW);
    cy.get('button[type="submit"]').click();

    cy.get('.mantine-Notification-title')
      .should('contain.text', strings.login_error)
      .and('be.visible');

    cy.get('.mantine-Notification-description')
      .should('contain.text', strings.incorrect_password)
      .and('be.visible');
  });
  

  it('Checks remember me option', () => {
    cy.contains('label', 'Remember Me').should('exist');
    cy.get('input[type="checkbox"]').check();
  });


  it('Checks forgot password button', () => {
    cy.contains('Forgot Password')
      .click();
  });
  
});
