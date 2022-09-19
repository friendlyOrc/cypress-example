Feature: Sample API intercept

    Sample about API intercept using cy.intercept()

    Scenario: Check normal response directly from API endpoint
        Given I Set "GET" api endpoint "/employees/"
        When I Set HEADER param request content type as "application/json"
        And I Set request Body as a employee list
        When I send HTTP request
        Then I receive valid HTTP response code "200"
        And Response BODY includes "3" record

    # Scenario: Empty response
    #     Given I Set "GET" api endpoint "/employees/"
    #     When I Set HEADER param request content type as "application/json"
    #     And I Set response Body as an empty list
    #     When I send HTTP request
    #     Then I receive valid HTTP response code "200"
    #     And Response BODY includes "0" record