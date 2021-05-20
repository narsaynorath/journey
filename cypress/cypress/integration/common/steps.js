import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am not logged in$/, () => {
  cy.clearCookies();
});

When(/^I navigate to the homepage$/, () => {
  cy.visit('/');
});

When(/^I click the "([^"]*)" link$/, (linkName) => {
  cy.contains('a', linkName).click();
});

When(/^I type "([^"]*)" into the "([^"]*)" field$/, (typeText, fieldName) => {
  cy.contains('input', fieldName).type(typeText);
});

When(/^I click the "([^"]*)" button$/, (buttonName) => {
  cy.contains('button', buttonName).click();
});

Then(/^I see the page title is "([^"]*)"$/, (title) => {
  cy.title().should('equal', title);
});

Then(/^I see a "([^"]*)" link$/, (linkName) => {
  cy.contains('a', linkName).should('be.visible');
});

Then(/^I see the URL is now "([^"]*)"$/, (url) => {
  cy.url().should('equal', `${Cypress.config().baseUrl}${url}`);
});

Then(/^I see a header with the text "([^"]*)"$/, (headerText) => {
  cy.contains('header', headerText).should('be.visible');
});

Then(/^I see a text input with the text "([^"]*)"$/, (inputText) => {
  cy.contains('input', inputText).should('be.visible');
});

Then(/^I see the text "([^"]*)$/, (text) => {
  cy.contains(text).should('be.visible');
});
