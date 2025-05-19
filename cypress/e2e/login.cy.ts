import strings from "../../login_Test/constatnts/constatnt";
import inputs from "../../login_Test/data/inputs";

describe('Login Page Test', () => { 
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'));
  });


  it('Checks texts', () => {
    cy.get('h2').should('be.visible');
    cy.get('.text-sm').should('be.visible');
  });


  it('Checks input fields', () => {
    cy.get('[data-testid="Email Address"]')
      .type(inputs.check_input_fields_email)
      .should('have.value', inputs.check_input_fields_email);

    cy.get('[data-testid="password"]')
      .type(inputs.check_input_fields_password)
      .should('have.value',inputs.check_input_fields_password);
  });

  
  it('Checks the login button', () => {
    cy.get('button[type="submit"]')
      .should('contain', 'Login')
      .and('be.visible')
      .and('not.be.disabled'); 
  });


  it('Empty field input', () => {
    cy.get('button[type="submit"]').click();
    cy.contains(strings.email_is_required).should('exist');
    cy.contains(strings.password_is_required).should('exist');
  });


  it('Invalid email input', () => {
    cy.get('[data-testid="Email Address"]').type(inputs.invalid_email);
    cy.get('[data-testid="password"]').click();
    cy.contains(strings.invalid_email).should('exist');
  });


  it('Logins successfully with correct credentials', () => {
    cy.get('[data-testid="Email Address"]').type(inputs.successful_login_email);
    cy.get('[data-testid="password"]').type(inputs.successful_login_PW);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
  });


  it('Shows error on incorrect credentials', () => {
    cy.get('[data-testid="Email Address"]').type(inputs.successful_login_email);
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
