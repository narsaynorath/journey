Feature: Logout button

        @creates_user
        Scenario: Logged in user can click Logout button
            Given I have created a user with the following fields:
                  | name         | username    | email                   | password |
                  | Cypress Test | cypresstest | cypresstest@example.com | password |
              And I am logged in with the username "cypresstest" and password "password"
              And I navigate to the homepage
              And I see the text "Welcome, Cypress Test!"
             When I click the "Logout" button
             Then I do not see the text "Welcome, Cypress Test!"
              And I see a "Login" link
              And I see a "Sign Up Free" link