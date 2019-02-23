/**
* Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

const models = require('../support/Models')
const homePage = require('../support/components/HomePage')
const helpers = require('../support/Helpers')
const modelPage = require('../support/components/ModelPage')
const train = require('../support/Train')
const editDialogModal = require('../support/components/EditDialogModal')

Cypress.TestCase('Tools', 'Visit Home Page', VisitHomePage)
export function VisitHomePage()
{
  homePage.Visit()
  homePage.GetModelListRowCount()
}

Cypress.TestCase('Tools', 'Create Model', CreateModel)
export function CreateModel(name = 'z-model')
{
  models.CreateNewModel(name)
  VisitHomePage()
}

Cypress.TestCase('Tools', 'Create Model 2', CreateModel2)
export function CreateModel2(name = 'z-model')
{
  models.CreateNewModel(name)
  VisitHomePage()
}

// This is a test case to test one of our test methods, cy.DoesNotContain.
// The problem with that method is that if it has a bug and does not find
// the element we were expecting to not be on the page it passes, so this
// will verify that our method is working as we expect.
Cypress.TestCase('Tools', 'Verify the "DoesNotContain" Test Method', VerifyDoesNotContainTestMethod)
export function VerifyDoesNotContainTestMethod()
{
  models.ImportModel('z-editContols', 'z-nameTrained.cl')
  modelPage.NavigateToTrainDialogs()

  train.EditTraining('My name is David.', 'My name is Susan.', 'Hello $name')
  train.CaptureOriginalChatMessages()

  editDialogModal.SelectChatTurn('My name is Susan.')
  editDialogModal.VerifyCyDoesNotContainMethodWorksWithSpecialChatSelector()

  editDialogModal.ClickSaveCloseButton()
}

Cypress.TestCase('Tools', 'Delete All Test Generated Models', DeleteAllTestGeneratedModels)
export function DeleteAllTestGeneratedModels() 
{
  homePage.Visit()
  // We must "Enqueue" this function call so that Cypress will have one "Cypress Command" 
  // still running when the DeleteAllRows function exits. If not for this, only one row will
  // get deleted then test execution will stop.
  cy.Enqueue(DeleteAllTestGeneratedModelRows).then(() => { helpers.ConLog(`Delete All Test Generated Models`, `DONE - All test generated models have been Deleted`) })
  cy.reload()
}

function DeleteAllTestGeneratedModelRows() 
{
  let thisFuncName = `DeleteAllTestGeneratedModelRows`
  
  cy.WaitForStableDOM()
  cy.Enqueue(() => { return homePage.GetModelNameIdList() } ).then(modelNameIdList => {
    let thereCouldBeMoreModelsToDelete = false
    modelNameIdList.forEach(modelNameId => 
    {
      if (modelNameId.name.startsWith('z-')) 
      {
        thereCouldBeMoreModelsToDelete = true
        helpers.ConLog(thisFuncName, `Sending Request to Delete Model: ${modelNameId.name}`)
        cy.request(
        { 
          url: `http://localhost:3978/sdk/app/${modelNameId.id}`, 
          method: "DELETE", 
          headers: { 'x-conversationlearner-memory-key': 'x' } 
        }).then(response => 
        { 
          helpers.ConLog(thisFuncName, `Response Status: ${response.status} - Model: ${modelNameId.name}`) 
          expect(response.status).to.eq(200)
        })
      }
    })
    
    cy.reload()
    if (thereCouldBeMoreModelsToDelete) {
      DeleteAllTestGeneratedModelRows()
    }
  })
}
