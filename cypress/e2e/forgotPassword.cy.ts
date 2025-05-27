import inputs from "../../auth_test/data/input";
import strings from "../../auth_test/constants/constant"
describe('forgot password option', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.contains('Forgot Password').click();
    });

    it('checks content', () => {
        cy.contains('Forgot Password');
        cy.get('[data-testid="email"]').should("exist");
        cy.get('button[type="submit"]').should("exist");
    });

    it('checks input fields', () => {
        cy.get('[data-testid="email"]').type(inputs.correct_email).should('have.value', inputs.correct_email);

    });

    it('checks empty input', () => {
        cy.get('button[type="submit"]').click();
        cy.contains(strings.empty_email).should('exist');
    });

    it('checks invalid email input', () => {
        cy.get('[data-testid="email"]').type(inputs.invalid_email);
        cy.get('button[type="submit"]').click();
        cy.contains(strings.invalid_email);
    });

    it('checks valid email input', () => {
        cy.get('[data-testid="email"]').type(inputs.correct_email);
        cy.get('button[type="submit"]').click();
    });

    it("submits valid email and redirects", () => {
        cy.intercept("POST", "**/forgotPassword**", {
            statusCode: 200,
            body: {},
        }).as("forgotPassword");

        cy.get('[data-testid="email"]').type(inputs.correct_email);
        cy.get('[role="submit-button"]').click();


    });

    it("shows error message on unregistered email input", () => {
        
        cy.on("uncaught:exception", (err, runnable) => {
            return false; 
        });

        cy.intercept("POST", "**/forgotPassword**", {
      statusCode: 400,
    }).as("forgotPasswordFail");


        cy.get('[data-testid="email"]').type("qabuyer6@yopmail.com");
        cy.get('button[type="submit"]').click();
        
        cy.get(".mantine-Notification-title")
            .should("contain.text", strings.login_error);
    });

    it('checks texts', () => {
        cy.contains('Go back to Login').click();
    })
})