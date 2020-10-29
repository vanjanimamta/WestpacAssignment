
const baseUrl = 'https://www.westpac.co.nz/';
const kiwiSaverCalculatorUrl = 'https://www.westpac.co.nz/kiwisaver/calculators/kiwisaver-calculator/';

describe('Validate all fields in the Kiwisaver Retirement calculator have got the information icon present',function () {

        it('Navigate to KiwiSaver Retirement Calculator', function () {
            cy.visit(baseUrl);
            cy.get('[id=ubermenu-section-link-kiwisaver-ps]')
                .trigger('mouseover', 'center');
            cy.get('[id=ubermenu-item-cta-kiwisaver-calculators-ps]')          
                .click();
            cy.contains('Click here to get started.')
                .click();
            cy.url().should('contain', kiwiSaverCalculatorUrl);                
        })

        it('should validate the help message when information icon besides current age field is clicked', function(){
            cy.visit(kiwiSaverCalculatorUrl);
            cy.get('#calculator-embed > iframe').then(($iframe) => {
                const body = $iframe.contents();
                                
                cy.wrap(body.find("[class='icon']:eq(0)").click()); // click on information button
                
                cy.wrap(body.find("[ng-show='helpService.visible(field.helpId)']:eq(0)")) 
                .should('contain', 'This calculator has an age limit of 18 to 64 years old.'); // validate the information text                               
        });
    })
})
