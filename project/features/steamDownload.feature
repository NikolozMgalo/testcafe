Feature: Test Steam

  Background:
    Given Steam page is open

  Scenario: Download Steam
    When Click on install Steam
    And When click on download steam installer
    Then Steam should be downloaded
