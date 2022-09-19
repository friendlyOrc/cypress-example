class clientConfigLogin {
  clientConfigLogin() {
    cy.login('/client');
    cy.visit(Cypress.env('BASE_URL') + '/client/configuration');
    cy.url().then(($url) => {
    if ($url.includes('/area-filter')) {
      cy.areaFilterAll();
    } 
  })
    cy.log('Verify user logged in to client-Config Application')
    cy.contains('client-Config').should('exist');
    cy.wait(1000);
  }
}

const clientConfigLoginPO = new clientConfigLogin();
export default clientConfigLoginPO;