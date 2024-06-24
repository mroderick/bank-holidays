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
    | DK             | 2019-12-20   | false  |
    | DK             | 2019-12-25   | true   |
    | DK             | 2020-12-25   | true   |
    | DK             | 2021-12-25   | true   |
    | DK             | 2022-12-25   | true   |
    | DK             | 2023-12-25   | true   |
    | DK             | 2024-12-25   | true   |
    | DK             | 2025-12-25   | true   |
    | DK             | 2026-12-25   | true   |
    | DK             | 2027-12-25   | true   |
    | DK             | 2028-12-25   | true   |
    | DK             | 2029-12-25   | true   |
    | DE             | 2024-12-25   | true   |
    | SE             | 2024-12-25   | true   |
