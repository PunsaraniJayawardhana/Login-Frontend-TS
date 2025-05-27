
import inputs from "../../addNewUser_test/data/input";
import login from "../../auth_test/data/input";
import strings from "../../addNewUser_test/constants/constant";


describe('Add new user test', () => {
    beforeEach(() => {
        cy.visit('/login');
        //cy.wait(10000);
        cy.get('[data-testid="Email Address"]').type(login.correct_email);
        cy.get('[data-testid="password"]').type(login.correct_password);
        cy.get('button[type="submit"]').click();

        cy.url();
        cy.wait(10000);
        cy.visit('app/users/add-edit');
        cy.contains('Add User', { timeout: 10000 }).should('exist');
    });

    it('renders the page and form with all fields', () => {
        cy.contains('Add User').should('exist');
        cy.get('[data-testid="phone"]').should('exist');
        cy.get('[data-testid="first-name"]').should('exist');
        cy.get('[data-testid="last-name"]').should('exist');
        cy.get('[data-testid="email"]').should('exist');
        cy.get('[data-testid="role"]').should('exist');
        cy.get('[data-testid="department"]').should('exist');
        cy.get('[data-testid="location"]').should('exist');
        cy.get('[data-testid="projects"]').should('exist');
        cy.get('[data-testid="cancel"]').should('exist');
        cy.get('button[type="submit"]').should('exist').and('be.visible')
            .and('not.be.disabled');;
    });

    it('empty field input', () => {
        cy.get('button[type="submit"]').click({timeout:10000});

        cy.contains(strings.first_name).should('exist');
        cy.contains(strings.last_name).should('exist');
        cy.contains(strings.empty_email).should('exist');
        cy.contains(strings.contact_number).should('exist');
        cy.contains(strings.departments).should('exist');
        cy.contains(strings.roles).should('exist');
    });

    it('invalid first name input',()=>{
        cy.get('[data-testid="first-name"]').type(inputs.invalid_name, {timeout:10000});
        cy.contains(strings.invalid_firstName).should('exist',);
    });

    it('invalid last name input', ()=>{
        cy.get('[data-testid="last-name"]').type(inputs.invalid_name,{timeout:10000});
        cy.contains(strings.invalid_lastName).should('exist');
    });

    it('invalid email input',()=>{
        cy.get('[data-testid="email"]').type(inputs.invalid_email,{timeout:10000});
        cy.contains(strings.invalid_email).should('exist');
    });

    it('invalid phone input',()=>{
        cy.get('[data-testid="phone"]').type(inputs.invalid_phone,{timeout:10000});
        cy.contains(strings.invalid_contactNo).should('exist');
    });

    it('checks departments dropdown functionality', () => {
        cy.get('[data-testid="department-dropdown"]').click({ timeout: 10000 });

        cy.contains('Stores').should('be.visible').click();

        cy.get('[data-testid="department-dropdown"]').parent().should('contain.text', 'Stores');

    });

     it('checks roles dropdown functionality', () => {
        cy.get('[data-testid="role-dropdown"]').click({ timeout: 10000 });

        cy.contains('Finance Manager').should('be.visible').click();

        cy.get('[data-testid="department-dropdown"]').parent().should('contain.text', 'Finance Manager');

    });

    it('checks successful user adding', ()=>{
        
        cy.get('[data-testid="phone"]').type(inputs.correct_phone);
        cy.get('[data-testid="first-name"]').type(inputs.correct_name);
        cy.get('[data-testid="last-name"]').type(inputs.correct_name);
        cy.get('[data-testid="email"]').type(inputs.correct_email);
        cy.get('[data-testid="role"]').type(inputs.correct_phone);
        cy.get('[data-testid="department"]').type(inputs.correct_phone);
        cy.get('button[type="submit"]').click();
    })

})

