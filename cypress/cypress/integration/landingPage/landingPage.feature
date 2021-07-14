Feature: Landing Page

        Scenario: Visiting the landing page shows basic account access buttons
            Given I am not logged in
             When I navigate to the homepage
             Then I see the page title is "Journey"
              And I see a "Login" button
              And I see a "Sign Up Free" button