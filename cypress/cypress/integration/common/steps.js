import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Before({ tags: '@creates_user' }, () => {
  // Cleans up cypresstest username before tests to avoid
  // prebuilt state conflict
  cy.deleteUser({ username: 'cypresstest' });
});

Given(/^I am not logged in$/, () => {
  cy.clearCookies();
});

Given(/^I have created a user with the following fields:$/, (dataTable) => {
  // Generate key-value pairs from the header and data table
  const data = Object.fromEntries(
    dataTable.rawTable[0].map((key, index) => [
      key,
      dataTable.rawTable[1][index],
    ])
  );
  cy.createUser(data);
});

Given(/^I navigate to the homepage$/, () => {
  cy.visit('/');
});

Given(/^I navigate to the sign up page$/, () => {
  cy.visit('/signup');
});

When(/^I click the "([^"]*)" link$/, (linkName) => {
  cy.contains('a', linkName).click();
});

When(/^I type "([^"]*)" into the "([^"]*)" field$/, (typeText, fieldName) => {
  cy.findByLabelText(fieldName).type(typeText);
});

When(/^I click the "([^"]*)" button$/, (buttonName) => {
  cy.findByRole('button', { name: buttonName }).click();
});

Then(/^I see a "([^"]*)" button$/, (buttonName) => {
  cy.findByRole('button', { name: buttonName }).should('be.visible');
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

Then(/^I see a "([^"]*)" field$/, (fieldLabel) => {
  cy.findByLabelText(fieldLabel).should('be.visible');
});

Then(/^I (see|do not see) the text "([^"]*)"$/, (visibility, text) => {
  const assertion = visibility === 'see' ? 'be.visible' : 'not.exist';
  cy.findByText(text).should(assertion);
});

Then(/^I see the "([^"]*)" field is empty$/, (fieldLabel) => {
  cy.findByLabelText(fieldLabel).should('have.value', '');
});

Then(/^I see an error that says "([^"]*)"$/, (text) => {
  cy.findByRole('alert', { text }).should('be.visible');
});
