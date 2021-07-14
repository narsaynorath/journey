Feature: Sign Up for New Account

        @creates_user
        Scenario: Existing user can successfully log in and gets redirected to homepage
            Given I am not logged in
              And I have created a user with the following fields:
                  | name          | username    | email                   | password |
                  | Cypress Test2 | cypresstest | cypresstest@example.com | password |
              And I navigate to the homepage
              And I click the "Login" link
              And I see the URL is now "/login"
              And I see a header with the text "Login"
              And I see a "Username" field
              And I see a "Password" field
              And I type "cypresstest" into the "Username" field
              And I type "password" into the "Password" field
             When I click the "Login" button
             Then I see the URL is now "/"
              And I see the text "Welcome, Cypress Test2!"

        Scenario: Failed login does not redirect to home page
            Given I am not logged in
              And I navigate to the homepage
              And I click the "Login" link
              And I see the URL is now "/login"
              And I see a header with the text "Login"
              And I see a "Username" field
              And I see a "Password" field
              And I type "DOESNOT3XIST" into the "Username" field
              And I type "password" into the "Password" field
             When I click the "Login" button
             Then I see the URL is now "/login"
              And I see the text "An error occurred."