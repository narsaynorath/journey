Feature: Sign Up for New Account

        Scenario: Successful New Account Registration
            Given I am not logged in
              And I navigate to the homepage
              And I click the "Sign Up Free" link
              And I see the URL is now "/signup"
              And I see a header with the text "Sign Up"
              And I see a text input with the text "Username"
              And I see a text input with the text "Email"
              And I see a text input with the text "Password"
             When I type "cypresstest" into the "Username" field
              And I type "cypresstest@example.com" into the "Email" field
              And I type "password" into the "Password" field
              And I click the "Sign Up" button
             Then I see the text "You have successfully signed up! Please login with your new account."
