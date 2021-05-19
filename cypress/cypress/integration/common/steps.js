import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^I am not logged in$/, () => {
  cy.clearCookies();
});

When(/^I navigate to the homepage$/, () => {
  cy.visit('/');
});

Then(/^I see the page title is "([^"]*)"$/, (title) => {
  cy.title().should('equal', title);
});

Then(/^I see a "([^"]*)" link$/, (linkName) => {
  cy.contains('a', linkName);
});
