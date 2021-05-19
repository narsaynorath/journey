import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('I open the homepage', () => {
  cy.visit('/');
});
