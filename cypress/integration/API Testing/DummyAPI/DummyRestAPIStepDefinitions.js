/// <reference types="cypress" />

import { When, Then, And, Given } from "cypress-cucumber-preprocessor/steps";
import { newEmployee } from "../integration/resources/create-new-employee";
import { expectedSchema } from "./resources/get_employee_list";
import Ajv from "ajv";

let requestProperties = {};
const ajv = new Ajv();

Given("I Set {string} posts api endpoint {string}", (methodType, path) => {
  requestProperties.method = methodType;
  requestProperties.url = Cypress.env("baseUrl") + path;
});

When("I Set HEADER param request content type as {string}", (header) => {
  requestProperties.header = {
    "Content-Type": header,
  };
});

And("Set request Body as request body from file create-new-employee.js", () => {
  requestProperties.body = newEmployee;
});

And("Send POST HTTP request", () => {
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

And(
  "Set request Body as request body with data {string} {string} {string}",
  (name, salary, age) => {
    requestProperties.name = name;
    requestProperties.salary = salary;
    requestProperties.age = age;
  }
);

And("Send GET HTTP request", () => {
  cy.request(requestProperties).as("API");
});

And("Response body matches the schema from file get_employee_list.js", () => {
  cy.get("@API").should((response) => {
    const validate = ajv.compile(expectedSchema);
    console.log(response.body);
    const valid = validate(response.body);
    if (!valid) console.log(validate.errors);
  });
});
