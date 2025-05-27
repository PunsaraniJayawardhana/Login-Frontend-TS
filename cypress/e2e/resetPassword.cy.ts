import strings from "../../auth_test/constants/constant";
import inputs from "../../auth_test/data/input";

describe('Reset password page test', ()=>{
    beforeEach(()=>{
        cy.visit('/reset-password');
        cy.contains('Forgot Password').click();
        cy.get('[data-testid="email"]').type("qabuyer@yopmail.com");
        cy.get('button[type="submit"]').click();
    });

    // it('checks content',()=>{
    //     cy.get('[data-testid="title"]').should('exist');
    //     cy.get('[data-testid="passcode"]').should('exist');
    //     cy.get('[data-testid="New-password"]').should('exist');
    //     cy.get('[data-testid="Confirm-password"]').should('exist');
    //     cy.get('button[type="submit"]').should('exist');
    //     cy.get('[data-testid="back-button"]').should('exist');
    // });

    // it('checks inputs',()=>{
    //     cy.get('[data-testid="New-password"]').type(inputs.correct_password).should('have.value',inputs.correct_password);
    //     cy.get('[data-testid="Confirm-password"]').type(inputs.correct_password).should('have.value',inputs.correct_password);
    // });

    it('checks empty input', ()=>{
        cy.get('button[type="submit"]').click();
    });

    // it('submit a password more than 20 characters', ()=>{

    // });

    // it('submit a password without special characters',()=>{

    // });

    // it('submit a password without upper case characters', ()=>{

    // });

    // it('submit a password without lower case characters', ()=>{

    // });

    // it('submit a password without numeric characters', ()=>{

    // });

    // it('submit a password less than 8 characters', ()=>{

    // });

    it('submit mismatching password and confirm password', ()=>{

    });

})