// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (path, force_relogin, username) => {
    if (force_relogin) {
        cy.getCookies().then((cookies) => cookies.forEach((cookie) => cy.clearCookie(cookie.name)));
    }

    cy.visit(Cypress.env('BASE_URL') + path);

    cy.url().then(($url) => {
        if ($url.includes('/auth/')) {   
        // Keycloak Login
        cy.get('#username').type(username || Cypress.env('LOGIN_USER'));
        cy.get('#password').type(Cypress.env('LOGIN_PASS'));
        cy.get('#kc-login').click();
    //      cy.url().should('include', path);
        } else if ($url.includes('/client/login/') && !$url.includes('/area-filter')) {
        // client Specific Login
        cy.get('#username').type(username || Cypress.env('LOGIN_USER'));
        cy.get('#password').type(Cypress.env('LOGIN_PASS'));
        cy.get('.its-button').click();
    //      cy.url().should('include', path);
        }

        cy.wait(500);
        // If at client area filter selection screen, select all area filters.
        cy.url().then(($url) => {
        if ($url.includes('/area-filter')) {
            cy.areaFilterAll();
        }
        });
    });
});

Cypress.Commands.add('areaFilterAll', () => {
    cy.get('#select-all > .its-radio__marker').click();
    cy.get('.its-button').click();
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
  