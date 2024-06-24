Feature: Is it a bank holiday in a country?

  Scenario: Unsupported country
    Given country code is "UNSUPPORTED"
    And date is "2024-12-25"
    When I ask whether it's a bank holiday
    Then I should receive an error "The supplied countryCode UNSUPPORTED is not included in the dataset"

  Scenario: Unsupported year
    Given country code is "DK"
    And date is "3024-12-25"
    When I ask whether it's a bank holiday
    Then I should receive an error like "is outside the supported range"

  Scenario Outline: A valid date is or is not a bank holiday in a supported country
    Given country code is "<countrycode>"
    And date is "<date>"
    When I ask whether it's a bank holiday
    Then I should be told <answer>

  Examples:
    | countrycode    | date         | answer |
    | DE             | 2024-01-01   | true   |
    | DK             | 2024-01-01   | true   |
    | DK             | 2024-01-02   | false  |
    | DK             | 2024-03-28   | true   |
    | DK             | 2024-03-29   | true   |
    | DK             | 2024-03-31   | true   |
    | DK             | 2024-04-01   | true   |
    | DK             | 2024-05-09   | true   |
    | DK             | 2024-05-10   | true   |
    | DK             | 2024-05-19   | true   |
    | DK             | 2024-05-20   | true   |
    | DK             | 2024-06-05   | true   |
    | DK             | 2024-12-24   | true   |
    | DK             | 2024-12-25   | true   |
    | DK             | 2024-12-26   | true   |
    | DK             | 2024-12-31   | true   |
