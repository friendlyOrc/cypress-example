import { After, And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

import clientCommon from '../../../support/POM/clientConfigCommon.js';
import functionCommon from '../../../support/POM/function.js';
import { afterEach } from "mocha";
import functionData from '../../../fixtures/function.json';

Given('I login into client Config', () => {
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
});

Then('I should see the client Config screen', () => {
    cy.url().should('contains', '/configuration')
})

afterEach( () => {
    clientCommon.closeAllTabIfOpen();
})

Given('I Open the Function list screen', () => {
    cy.log('Open the Function list screen')
    functionCommon.openAllFunctions()
})

Then('I should see the Function screen', function() {
    cy.log('Verifying tab text, header for grid and tool bar options')
    clientCommon.validateExactText(clientCommon.firstTab, functionData.allFunctionTitle)
    clientCommon.validateExactText(clientCommon.firstHeader, functionData.allFunctionHeader)
    clientCommon.checkToolbarOptionsGrid();
    
    functionCommon.verifyAllFunctionsLabels()
})

Then('I should be able to hide and show columns', function(){
    functionCommon.toggleFunctionColumn(functionCommon.checkboxColumnDisplaySubArea)
    clientCommon.validateExistence(functionCommon.subHeader, "No")
    functionCommon.toggleFunctionColumn(functionCommon.checkboxColumnDisplaySubArea)
    clientCommon.validateExistence(functionCommon.subHeader, "Yes")
})

When('I filter for {string} SCN', (scn) => {
    clientCommon.filterSCNonGrid(scn);
})

And('I click on the first record', () => {
    cy.get(clientCommon.gridFirstRow).click({force:true});
})

And('I click on the View button', () => {
    cy.get(clientCommon.viewBtn).click();
})

Then('I should see the Function Config screen', (scn) => {
    cy.log('Verifying tab text and header for View record from grid');
    clientCommon.validateExactText(clientCommon.firstTab, functionData.SCNValGW + " - " + functionData.allFunctionTitle);
    clientCommon.validateExactText(clientCommon.frmHeader, functionData.frmHeaderText + " " + functionData.SCNValGW + " Configuration");
    cy.log('Verifying fields are read only');
    functionCommon.verifyFunctionFieldsReadOnly();
    cy.log('Verifying toolbar options');
    clientCommon.checkToolbarOptionsViewFromGrid();
})

When('I search for {string} SCN', (scn) => {
    cy.log('Searching a SCN');
    clientCommon.searchForSCN(functionData.SCNValGW)
})

Then('I should see the Function Config screen from search', (scn) => {
    cy.log('Verifying fields are readonly');
    functionCommon.verifyFunctionFieldsReadOnly(); 
    cy.log('Verifying toolbar options');
    clientCommon.checkToolbarOptionsFromSearch();
    cy.log('Validating field values');
    functionCommon.verifyFunctionFieldValues();
})

Then('I should see the {string} detail tab', (scn) => {
    cy.log('Verifying tab text and header for View record from grid');
    clientCommon.validateExactText(clientCommon.firstTab, scn + " - " + functionData.allFunctionTitle);
    clientCommon.validateExactText(clientCommon.frmHeader, functionData.frmHeaderText + " " + scn + " Configuration");
    cy.log('Verifying fields are read only');
    functionCommon.verifyFunctionFieldsReadOnly();
    cy.log('Verifying toolbar options');
    clientCommon.checkToolbarOptionsViewFromGrid();

})