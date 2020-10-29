
const kiwiSaverCalculatorUrl = 'https://www.westpac.co.nz/kiwisaver/calculators/kiwisaver-calculator/';

describe('Calculate kiwiSaver projected balance at retirement',function () {

        it('should calculate projectedn balance at retirement for a employed user aged 30 years', function () {
            cy.visit(kiwiSaverCalculatorUrl);
            cy.get('#calculator-embed > iframe').then(($iframe) => {
                const body = $iframe.contents();

                cy.wrap(body.find("[type='text']:eq(0)")).type('30');//input age 30        

                cy.wrap(body.find("[class='control select-control  no-selection']:eq(0)").click());
                cy.wrap(body.find("[value='employed']:eq(0)").click()); //Select Employment Status Employed
                
                cy.wrap(body.find("[ng-model='displayModel']:eq(1)")).type('82000');
                cy.wrap(body.find("[ng-model='displayModel']:eq(2)")).click();

                cy.wrap(body.find("[id='radio-option-04F']").click()); //select 4% kiwisaver member contribution
                cy.wrap(body.find("[id='radio-option-013']").click()); //select Defensive risk profile
                
                cy.wrap(body.find("[class='btn btn-regular btn-results-reveal btn-has-chevron']")).click();
                
                cy.wrap(body).should('contain', 'At age 65, your KiwiSaver balance is estimated to be');
                cy.wrap(body).should('contain', '$436,365');                          
        })
    })

    it('should calculate projectedn balance at retirement for a self-employed user aged 45 years', function () {
            cy.visit(kiwiSaverCalculatorUrl);
            cy.get('#calculator-embed > iframe').then(($iframe) => {
                const body = $iframe.contents();

                cy.wrap(body.find("[type='text']:eq(0)")).type('45');//input age 45
                
                cy.wrap(body.find("[class='control select-control  no-selection']:eq(0)").click());
                cy.wrap(body.find("[value='self-employed']:eq(0)").click()); //Select Employment Status Self-Employed

                cy.wrap(body.find("[ng-model='displayModel']:eq(1)")).type('100000'); //Enter current kiwisaver balance
                cy.wrap(body.find("[ng-model='displayModel']:eq(2)")).type('90'); //Enter voluntary contribution as $90

                cy.wrap(body.find("[class='control select-control  no-selection']:eq(0)").click());
                cy.wrap(body.find("[value='fortnight']:eq(0)").click()); //Select frequency as fortnightly 

                cy.wrap(body.find("[id='radio-option-016']").click()); //Select Conservative risk profile 
                cy.wrap(body.find("[ng-model='displayModel']:eq(3)")).type('290000'); //Enter saving goal at retirement as $290,000

                cy.wrap(body.find("[class='btn btn-regular btn-results-reveal btn-has-chevron']")).click(); //Click View your Kiwisaver retirement projections button
                
                cy.wrap(body).should('contain', 'At age 65, your KiwiSaver balance is estimated to be');
                cy.wrap(body).should('contain', '$259,581'); //validate the estimated balance at retirement

            });
        })   
        
        it('should calculate projectedn balance at retirement for user aged 55 years who is not-employed', function () {
            cy.visit(kiwiSaverCalculatorUrl);
            cy.get('#calculator-embed > iframe').then(($iframe) => {
                const body = $iframe.contents();

                cy.wrap(body.find("[type='text']:eq(0)")).type('55');//input age 55
                
                cy.wrap(body.find("[class='control select-control  no-selection']:eq(0)").click());
                cy.wrap(body.find("[value='not-employed']:eq(0)").click()); //Select Employment Status Self-Employed

                cy.wrap(body.find("[ng-model='displayModel']:eq(1)")).type('140000'); //Enter current kiwisaver balance
                cy.wrap(body.find("[ng-model='displayModel']:eq(2)")).type('10'); //Enter voluntary contribution as $10

                cy.wrap(body.find("[class='control select-control  no-selection']:eq(0)").click());
                cy.wrap(body.find("[value='year']:eq(0)").click()); //Select frequency as annually

                cy.wrap(body.find("[id='radio-option-019']").click()); //Select Balanced risk profile 
                cy.wrap(body.find("[ng-model='displayModel']:eq(3)")).type('200000'); //Enter saving goal at retirement as $200,000

                cy.wrap(body.find("[class='btn btn-regular btn-results-reveal btn-has-chevron']")).click(); //Click View your Kiwisaver retirement projections button
                
                cy.wrap(body).should('contain', 'At age 65, your KiwiSaver balance is estimated to be'); //validate the estimated balance at retirement
                cy.wrap(body).should('contain', '$197,679'); 

            });
        })
    })
