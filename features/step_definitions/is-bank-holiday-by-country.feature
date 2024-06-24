Feature: Is it a bank holiday in a country?

  Scenario Outline: A valid date is or is not a bank holiday in a supported country
    Given country code is "<countrycode>"
    And date is "<date>"
    When I ask whether it's a bank holiday
    Then I should be told <answer>

  Examples:
    | countrycode    | date         | answer |
    | DK             | 2024-12-25   | true   |
    | DE             | 2024-12-25   | true   |
    | SE             | 2024-12-25   | true   |
