Feature: Client-12769-View_Function_form

    Test cases to verify the View Function form

    # Background behaves like Before each hook
    Background: Login to Client Config 
        Given I login into Client Config
        Then I should see the Client Config screen
    
    @View
    Scenario: Verify the Function screen
        Given I Open the Function list screen
        Then I should see the Function screen
    
    @View
    Scenario: Check hide/show Column
        Given I Open the Function list screen
        Then I should be able to hide and show columns

    @View
    Scenario: Check Fields are read only, validate header and tab text and toolbar options from Grid View option (Sub type: Function)
        Given I Open the Function list screen
        When I filter for "G77/777" SCN
        And I click on the first record
        * I click on the View button
        Then I should see the Function Config screen

    @View
    Scenario: View form - Validate the form, from Search using SCN (Sub type: Function)
        Given I Open the Function list screen
        When I search for "G77/777" SCN
        Then I should see the Function Config screen from search

    @View
    Scenario Outline: View form from View button
        Given I Open the Function list screen
        When I filter for "<SCN>" SCN
        And I click on the first record
        * I click on the View button
        Then I should see the "<SCN>" detail tab

        Examples:
            | SCN | 
            | G77/771  | 
            | G77/772  | 
            | G77/773  | 
            | G77/774  | 

    