/// <reference types="cypress" />

import { After, And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { employeeList } from "../fixtures/employeeList.json"

let requestProperties = {};

Given("I Set {string} api endpoint {string}", (methodType, path) => {
  requestProperties.method = methodType;
  requestProperties.url = Cypress.env("apiUrl") + path;
});

When("I Set HEADER param request content type as {string}", (header) => {
    requestProperties.header = {
      "Content-Type": header,
    };
  });

And("I Set request Body as a employee list", () => {
    requestProperties.body = employeeList
});

And("I send HTTP request", () => {
    cy.request(requestProperties).as("API");
});

Then("I receive valid HTTP response code {string}", (statusCode) => {
    cy.get("@API").should((response) => {
      expect(String(response.status)).to.eq(statusCode);
    });
});

And("Response BODY includes value of {string} is {string}", (status, value) => {
    cy.get("@API").should((response) => {
        expect(response.body[status]).to.eq(value);
    });
});

And('Response BODY includes {string} record', (value) => {
  cy.get('@API').should((response) =>{
    expect(response.body.length + '').to.eq(value)
  })
})

And("I Set response Body as an empty list", () => {
  cy.intercept('GET', Cypress.env('apiUrl') + '/employees/', {
    statusCode: 200,
    body: [{}]
  })
});