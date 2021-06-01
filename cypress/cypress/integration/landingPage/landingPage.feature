Feature: Landing Page

        Scenario: Visiting the landing page shows basic account access buttons
            Given I am not logged in
             When I navigate to the homepage
             Then I see the page title is "Journey"
              And I see a "Login" link
              And I see a "Sign Up Free" link

        Scenario: Landing page displays field for searching cities and countries
            Given I navigate to the homepage
              And I see the text "Let's plan your next adventure!"
              And I type "Toron" into the "Destination" field
              And I see the text "Toronto"
              And I see the text "Canada"
             When I select the "Toronto" option
             Then I see the "Destination" field has the value "Toronto, Canada"
