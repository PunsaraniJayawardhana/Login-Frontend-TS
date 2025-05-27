import inputs from "../../addNewUser_test/data/input";
import login from "../../auth_test/data/input";
import strings from "../../addNewUser_test/constants/constant";


describe('Add new user test', () => {
    beforeEach(() => {

        cy.intercept('GET', '**/master-data/financial-parameters', {
        }).as('getFinancialParameters');

        cy.intercept('GET', '**/system-configs', (req) => {
        }).as('getSystemConfigs');

        cy.visit('/login');
        //cy.wait(10000);
        cy.get('[data-testid="Email Address"]').type(login.correct_email);
        cy.get('[data-testid="password"]').type(login.correct_password);
        cy.get('button[type="submit"]').click();

        cy.url();
        cy.wait(10000);
        cy.visit('app/workflow');
    });


    it('renders the page', () => {
        cy.wait('@getFinancialParameters');
        cy.wait('@getSystemConfigs');
        cy.get('[data-testid="title"]').should('exist');

        cy.get('[data-testid="table"]').should('exist');
        cy.contains('Purchase Order Flow').should('exist', { timeout: 10000 });
        cy.contains('Received Note Flow').should('exist', { timeout: 10000 });
        cy.contains('Invoice Flow').should('exist', { timeout: 10000 });
        cy.contains('Intake Flow - Accounting Department').should('exist', { timeout: 10000 });
        cy.contains('Intake Flow - Sourcing Department').should('exist', { timeout: 10000 });
        cy.contains('Intake Flow - Stores Department').should('exist', { timeout: 10000 });

        cy.get('[data-testid="edit-button"]').should('have.length', 6);
    });


    it('should render edit buttons and navigate on click', () => {
        cy.get('[data-testid="edit-button"]').each(($btn) => {
            cy.wrap($btn).click({ timeout: 10000 });
            cy.url().should('include', '/workflow/edit').and('include', 'type=').and('include', 'department=');
            cy.go('back');
        });

    });

    it.only('should render edit buttons and navigate on click', () => {
        cy.wait('@getFinancialParameters');
        cy.wait('@getSystemConfigs');

        cy.contains('Purchase Order Flow').should('exist', { timeout: 10000 });
        cy.get('[data-testid="edit-button"]').first().click({ force: true });

        cy.url().should('include', '/workflow/edit')
            .and('include', 'type=')
            .and('include', 'department=');

        cy.visit('/app/workflow');
    });

});