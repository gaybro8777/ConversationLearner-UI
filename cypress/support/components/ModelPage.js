/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

const entitiesGrid = require('../../support/components/EntitiesGrid')
const actionsGrid  = require('../../support/components/ActionsGrid')
const trainDialogsGrid = require('./TrainDialogsGrid')
const logDialogsGrid = require('../../support/components/LogDialogsGrid')
const settings = require('../../support/components/Settings')
 
export function VerifyModelName(name)     { cy.get('[data-testid="app-index-model-name"]').should(el => { expect(el).to.contain(name) })}
export function VerifyPageTitle()         { cy.get('[data-testid="dashboard-title"]').contains('Log Dialogs').should('be.visible') }

export function NavigateToHome()          { cy.get('[data-testid="app-index-nav-link-home"]').Click();          VerifyPageTitle() }
export function NavigateToEntities()      { cy.get('[data-testid="app-index-nav-link-entities"]').Click();      entitiesGrid.VerifyPageTitle() }
export function NavigateToActions()       { cy.get('[data-testid="app-index-nav-link-actions"]').Click();       actionsGrid.VerifyPageTitle() }
export function NavigateToTrainDialogs()  { cy.get('[data-testid="app-index-nav-link-train-dialogs"]').Click(); trainDialogsGrid.VerifyPageTitle() }
export function NavigateToLogDialogs()    { cy.get('[data-testid="app-index-nav-link-log-dialogs"]').Click();   logDialogsGrid.VerifyPageTitle() }
export function NavigateToSettings()      { cy.get('[data-testid="app-index-nav-link-settings"]').Click();      settings.VerifyPageTitle() }
export function VerifyNoErrorIconOnPage() { cy.DoesNotContain('i[data-icon-name="IncidentTriangle"].cl-color-error') }

// For the Left Pane "Train Dialogs" link.
export function VerifyErrorIconForTrainDialogs() { cy.get('[data-testid="app-index-nav-link-train-dialogs"]').find('i[data-icon-name="IncidentTriangle"].cl-color-error') }

// To validate that this code works, search src\actions\appActions.ts for these and alter them:
//   fetchApplicationTrainingStatusThunkAsync
//   interval:
//   maxDuration:
var canRefreshTrainingStatusTime = 0
export function WaitForTrainingStatusCompleted()  
{
  var currentHtml = Cypress.$('html')[0].outerHTML
  var currentTime = new Date().getTime()
  if (currentHtml.includes('data-testid="training-status-polling-stopped-warning"') &&
     (currentTime > canRefreshTrainingStatusTime))
  {    
    canRefreshTrainingStatusTime = currentTime + (2 * 1000)
    
    // When we get here it is possible there are two refresh buttons on the page, one that
    // is covered up by a popup dialog. Unfortunately the .click() function can take only
    // one element to click on, so this code is an attempt to deal with that issue.
    cy.get('[data-testid="training-status-refresh-button"]').then((elements) => { cy.wrap(elements[elements.length - 1]).click() })
  
    // The reason we need to call this method once again using cy.WaitForTrainingStatusCompleted()
    // is because the .click() function causes the time out to change to a default of 4 seconds
    cy.WaitForTrainingStatusCompleted()
  }
  expect(currentHtml.includes('data-testid="training-status-completed"')).to.equal(true)
}