Feature: Sign Up for New Account

        @creates_user
        Scenario: Filled form successfully registers user
            Given I am not logged in
              And I navigate to the homepage
              And I click the "Sign Up Free" button
              And I see the URL is now "/signup"
              And I see a header with the text "Sign Up"
              And I see a "Name (optional)" field
              And I see a "Username" field
              And I see a "Email" field
              And I see a "Password" field
              And I type "Cypress Test" into the "Name (optional)" field
              And I type "cypresstest" into the "Username" field
              And I type "cypresstest@example.com" into the "Email" field
              And I type "password" into the "Password" field
             When I click the "Sign Up" button
             Then I see the "Name (optional)" field is empty
              And I see the "Username" field is empty
              And I see the "Email" field is empty
              And I see the "Password" field is empty
              And I see the text "You have successfully signed up! Please login with your new account, Cypress Test."

        @creates_user
        Scenario: Name is optional for registration
            Given I am not logged in
              And I navigate to the sign up page
              And I see a header with the text "Sign Up"
              And I see a "Name (optional)" field
              And I see a "Username" field
              And I see a "Email" field
              And I see a "Password" field
              And I type "cypresstest" into the "Username" field
              And I type "cypresstest@example.com" into the "Email" field
              And I type "password" into the "Password" field
             When I click the "Sign Up" button
             Then I see the "Name (optional)" field is empty
              And I see the "Username" field is empty
              And I see the "Email" field is empty
              And I see the "Password" field is empty
              And I see the text "You have successfully signed up! Please login with your new account."

        @creates_user
        Scenario: Account registration fails if user already exists
            Given I am not logged in
              And I have created a user with the following fields:
                  | name          | username    | email                   | password |
                  | Cypress Test2 | cypresstest | cypresstest@example.com | password |
              And I navigate to the sign up page
              And I type "Cypress Test" into the "Name (optional)" field
              And I type "cypresstest" into the "Username" field
              And I type "cypresstest@example.com" into the "Email" field
              And I type "password" into the "Password" field
             When I click the "Sign Up" button
             Then I do not see the text "You have successfully signed up! Please login with your new account, Cypress Test."
              And I see an error that says "This user account is already taken."