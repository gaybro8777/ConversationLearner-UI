/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

const modelPage = require('../components/ModelPage')
const settings = require('../components/Settings')
const helpers = require('../Helpers')

export function Visit() { return cy.visit('http://localhost:5050'); VerifyPageTitle() }
export function VerifyPageTitle() { return cy.Get('[data-testid="model-list-title"]').contains('Create and manage your Conversation Learner models').should('be.visible') }
export function NavigateToModelPage(name) { return cy.Get('[data-testid="model-list-model-name"]').ExactMatch(`${name}`).Click() }
export function ClickNewModelButton() { return cy.Get('[data-testid="model-list-create-new-button"]').Click() }
export function ClickImportModelButton() { return cy.Get('[data-testid="model-list-import-model-button"]').Click() }
export function TypeModelName(name) { return cy.Get('[data-testid="model-creator-input-name"]').type(name) }
export function ClickSubmitButton() { return cy.Get('[data-testid="model-creator-submit-button"]').Click() }

export function UploadImportModelFile(name) { return cy.UploadFile(name, `[data-testid=model-creator-import-file-picker] > div > input[type="file"]`) }

export function ClickDeleteModelButton(row) { return cy.Get(`[data-list-index="${row}"] > .ms-FocusZone > .ms-DetailsRow-fields`).find('i[data-icon-name="Delete"]').Click() }
export function ClickConfirmButton() { return cy.Get('.ms-Dialog-main').contains('Confirm').Click() }

export function GetModelListRowCount() {
  return cy.Get('[data-automationid="DetailsList"] > [role="grid"]')
    .then(gridElement => { var rowCount = +gridElement.attr('aria-rowcount') - 1; return rowCount })
}

export function GetModelNameIdList() {
  // Scroll to the bottom of the screen so all models loads.
  // However, it appear
  cy.scrollTo('bottomLeft', { duration: 5000, easing: 'linear' });
  cy.WaitForStableDOM();
  cy.wait(2000);

  cy.Enqueue(() => {
    let listToReturn = new Array();
    let elements = Cypress.$('[data-testid="model-list-model-name"]');
    for (var i = 0; i < elements.length; i++) {
      let modelName = elements[i].innerText;
      let modelId = elements[i].getAttribute('data-model-id');
      listToReturn.push({ name: modelName, id: modelId });
      helpers.ConLog('GetModelNameIdList', `modelName: ${modelName} - modelId: ${modelId}`);
    }
    helpers.ConLog('GetModelNameIdList', `Returning a list of ${listToReturn.length} models`);
    return listToReturn;
  });
}