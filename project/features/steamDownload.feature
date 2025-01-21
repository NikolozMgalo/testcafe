Feature: Test Steam

    Background: 
        Given Steam page is open

    Scenario: Download Steam
        When Click on install Steam
        And When click on download steam installer
        Then Steam should be downloaded

    #Scenario: Discounted Game
        #When Select Categories and Action
        #Then Action categories page is opened
        #Then Top Seller tab should be visible
        #When Go to top sellers tab
        #And select game with highest Discount
        #Then Game page should be displayed
        #And Game price and discount should be correct

