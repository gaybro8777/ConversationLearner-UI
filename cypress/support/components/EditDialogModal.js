/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

const homePage = require('../../support/components/HomePage')
const helpers = require('../../support/Helpers')
const scorerModal = require('../../support/components/ScorerModal')

export const AllChatMessagesSelector = 'div[data-testid="web-chat-utterances"] > div.wc-message-content > div > div.format-markdown > p'
export const TypeYourMessageSelector = 'input.wc-shellinput[placeholder="Type your message..."]' // data-testid NOT possible
export const ScoreActionsButtonSelector = '[data-testid="score-actions-button"]'

export function TypeYourMessage(trainMessage) { cy.Get(TypeYourMessageSelector).type(`${trainMessage}{enter}`) }
export function TypeAlternativeInput(trainMessage) { cy.Get('[data-testid="entity-extractor-alternative-input-text"]').type(`${trainMessage}{enter}`) }
export function ClickSetInitialStateButton() { cy.Get('[data-testid="teach-session-set-initial-state"]').Click() }
export function ClickScoreActionsButton() { cy.Get(ScoreActionsButtonSelector).Click() }
export function VerifyEntityMemoryIsEmpty() { cy.Get('[data-testid="memory-table-empty"]').contains('Empty') }
export function EntitySearch() { cy.Get('[data-testid="entity-picker-entity-search"]') }
export function ClickAddAlternativeInputButton() { cy.Get('[data-testid="entity-extractor-add-alternative-input-button"]').Click() }
export function ClickEntityDetectionToken(tokenValue) { cy.Get('[data-testid="token-node-entity-value"]').contains(tokenValue).Click() }
export function ClickSubmitChangesButton() { cy.Get('[data-testid="submit-changes-button"]').Click() }
export function GetAllChatMessages() { return helpers.StringArrayFromElementText(AllChatMessagesSelector) }
export function VerifyErrorMessage(expectedMessage) { cy.Get('div.cl-editdialog-error > div > span').ExactMatch(expectedMessage) }
export function VerifyNoErrorMessage() { cy.DoesNotContain('div.cl-editdialog-error > div > span') }
export function ClickDeleteChatTurn() { cy.Get('[data-testid="edit-dialog-modal-delete-turn-button"]').Click() }
export function VerifyTypeYourMessageIsMissing() { cy.DoesNotContain(TypeYourMessageSelector) }
export function VerifyScoreActionsButtonIsMissing() { cy.DoesNotContain(ScoreActionsButtonSelector) }

export function VerifyScenario(expectedScenario) { cy.Get(`input.cl-borderless-text-input#description[value="${expectedScenario}"]`) }
export function TypeScenario(scenario) { cy.Get('input.cl-borderless-text-input#description').type(`${scenario}{enter}`) }
export function ClickAddTagButton() { cy.Get('button.cl-tags__button-add#tags').Click() }
export function VerifyNoTags() { cy.Get('div.cl-tags > div.cl-tags__tag > button > i [data-icon-name="Clear"]').should('have.length', 0) }
export function VerifyTags(tags) { 
  cy.Enqueue(() => {
    helpers.ConLog('VerifyTags', 'Start')
    let tagsOnPage = helpers.StringArrayFromElementText('div.cl-tags > div.cl-tags__tag > span')
    let missingTags = []
    tags.forEach(tag => {
      if (!tagsOnPage.find(tagOnPage => tag === tagOnPage)) missingTags.push(tag)
    })
    if (missingTags.length > 0) throw `Failed to find these tags: ${missingTags}`
  })
}

export function AddTag(tag) { 
  cy.DumpHtmlOnDomChange(true)
  cy.Get('button.cl-tags__button-add#tags').Click()
  cy.Get('input#tags').type(`${tag}{enter}`)
  cy.WaitForStableDOM()
  cy.DumpHtmlOnDomChange(false)
}


export function ClickSaveCloseButton() { cy.Get('[data-testid="edit-teach-dialog-close-save-button"]').Click() }
export function VerifyCloseButtonLabel() { cy.Get('[data-testid="edit-teach-dialog-close-save-button"]').contains('Close') }
export function VerifySaveBranchButtonLabel() { cy.Get('[data-testid="edit-teach-dialog-close-save-button"]').contains('Save Branch') }
export function ClickAbandonDeleteButton() { cy.Get('[data-testid="edit-dialog-modal-abandon-delete-button"]').Click() }
export function VerifyDeleteButtonLabel() { cy.Get('[data-testid="edit-dialog-modal-abandon-delete-button"]').contains('Delete') }
export function VerifyAbandonBranchButtonLabel() { cy.Get('[data-testid="edit-dialog-modal-abandon-delete-button"]').contains('Abandon Branch') }
export function ClickUndoButton() { cy.Get('[data-testid="edit-teach-dialog-undo-button"]').Click() }

export function ClickConfirmAbandonDialogButton() { return cy.Get('.ms-Dialog-main').contains('abandon').parents('.ms-Dialog-main').contains('Confirm').Click() }

// Verify that the branch button is within the same control group as the message.
export function VerifyBranchButtonGroupContainsMessage(message) {
  cy.Get('[data-testid="edit-dialog-modal-branch-button"]').as('branchButton')
    .parents('div.wc-message-selected').contains('p', message)
}

export function AbandonBranchChanges() {
  ClickAbandonDeleteButton()
  homePage.ClickConfirmButton()
}

// -----------------------------------------------------------------------------
// Selects FROM ALL chat messages, from both Bot and User.
// Once clicked, more UI elements will become visible & enabled.
// OPTIONAL index parameter lets you select other than the 1st 
// instance of a message.
// RETURNS: The index of the selected turn.

export function SelectChatTurnExactMatch(message, index = 0) { 
  return SelectChatTurnInternal(message, index, (elementText, transformedMessage) => elementText === transformedMessage)}

export function SelectChatTurnStartsWith(message, index = 0) {
  return SelectChatTurnInternal(message, index, (elementText, transformedMessage) => elementText.startsWith(transformedMessage))}

function SelectChatTurnInternal(message, index, matchPredicate) {
  var funcName = `SelectChatTurnInternal(${message}, ${index})`
  cy.ConLog(funcName, `Start`)

  cy.WaitForStableDOM()
  cy.Enqueue(() => {
    message = message.replace(/'/g, "’")
    var elements = Cypress.$(AllChatMessagesSelector)
    helpers.ConLog(funcName, `Chat message count: ${elements.length}`)
    for (var i = 0; i < elements.length; i++) {
      helpers.ConLog(funcName, `Chat turn: '${elements[i].innerHTML}'`)
      if (matchPredicate(elements[i].textContent, message)) {
        if (index > 0) index--
        else {
          helpers.ConLog(funcName, `FOUND!`)
          elements[i].click()
          return i
        }
      }
      else helpers.ConLog(funcName, `NOT A MATCH`)
      helpers.ConLog(funcName, `NEXT`)
    }
    throw `${funcName} - Failed to find the message in chat utterances`
  })
}

// -----------------------------------------------------------------------------

// This is meant to be called after SelectChatTurn for a user message.
// Do NOT use this for bot messages, since they have no branching capabilities.
// Side Effect: '@branchButton' alias is created.
export function VerifyBranchButtonIsInSameControlGroupAsMessage(message) {
  // Verify that the branch button is within the same control group as the originalMessage that was just selected.
  cy.Get('[data-testid="edit-dialog-modal-branch-button"]').as('branchButton')
    .parents('div.wc-message-selected').contains('p', message)
}

// This depends on the '@branchButton' alias having been created by the VerifyBranchButtonIsInSameControlGroupAsMessage() function.
export function BranchChatTurn(message) {
  cy.Get('@branchButton').Click()
  cy.Get('[data-testid="user-input-modal-new-message-input"]').type(`${message}{enter}`)
}

// Creates the '@allChatTurns' alias.
export function GetAllChatTurns() {
  cy.Get('[data-testid="web-chat-utterances"]').as('allChatTurns')
}

export function VerifyChatTurnControls(element, index) {
  var userMessage
  if (element.classList.contains('wc-message-from-me')) userMessage = true
  else if (element.classList.contains('wc-message-from-bot')) userMessage = false
  else {
    helpers.Dump(`VerifyChatTurnControls()`, element)
    throw 'Expecting element to contain class with either "wc-message-from-me" or "wc-message-from-bot" (see console output for element dump)'
  }

  if (index > 0) cy.Contains('[data-testid="edit-dialog-modal-delete-turn-button"]', 'Delete Turn')
  else cy.DoesNotContain('[data-testid="edit-dialog-modal-delete-turn-button"]')

  cy.Contains('[data-testid="chat-edit-add-bot-response-button"]', '+')

  if (userMessage) cy.Get('[data-testid="edit-dialog-modal-branch-button"]').Contains('Branch').ConLog(`VerifyChatTurnControls()`, 'Branch Found')
  else cy.DoesNotContain('[data-testid="edit-dialog-modal-branch-button"]')

  cy.Contains('[data-testid="chat-edit-add-user-input-button"]', '+')
}

// Provide any user message and any Bot message expected in chat.
export function VerifyThereAreNoChatEditControls(userMessage, botMessage) {
  // These confirm we are looking at the chat history we are expecting to validate.
  cy.Get('.wc-message-from-me').contains(userMessage)
  cy.Get('.wc-message-from-bot').contains(botMessage)

  // These do the actual validation this function is intended to validate.
  // We expect NO Chat Edit Controls at all on this page.
  cy.DoesNotContain('[data-testid="edit-dialog-modal-delete-turn-button"]')
  cy.DoesNotContain('[data-testid="chat-edit-add-bot-response-button"]', '+')
  cy.DoesNotContain('[data-testid="edit-dialog-modal-branch-button"]')
  cy.DoesNotContain('[data-testid="chat-edit-add-user-input-button"]', '+')
}

// This is an odd verification function in that it is validating test code that we
// had wrong at one point. We need to do this because if the cy.DoesNotContain fails
// to find the selector, it could mean that cy.DoesNotContain method has a bug in it.
export function VerifyCyDoesNotContainMethodWorksWithSpecialChatSelector(userMessage, botMessage) {
  cy.log('EXPECTED FAILURE Comming Next')
  cy.DoesNotContain('[data-testid="chat-edit-add-bot-response-button"]', '+', true).then(expectedFailureOccurred => {
    expect(expectedFailureOccurred).to.be.true
  })
}

export function LabelTextAsEntity(text, entity, itMustNotBeLabeledYet = true) {
  function LabelIt() {
    // This actually works if text is a word or a phrase.
    cy.Get('body').trigger('Test_SelectWord', { detail: text })
    cy.Get('[data-testid="entity-picker-entity-search"]').type(`${entity}{enter}`)
  }

  if (itMustNotBeLabeledYet) LabelIt()
  else {
    // First make sure it is not already labeled before trying to label it.
    cy.WaitForStableDOM()
    cy.Enqueue(() => {
      var found = false
      var elements = Cypress.$('[data-testid="token-node-entity-value"] > span > span')

      // If you need to find a phrase, this part of the code will fail, 
      // you will need to upgrade this code in that case.
      var element = elements.find(element => element.textContent === text)
      if (element) {
        found = Cypress.$(element).parents('.cl-entity-node--custom').find(`[data-testid="custom-entity-name-button"]:contains('${entity}')`).length == 0
      }
      if (!found) LabelIt()
    })
  }
}



// Verify that a specific word of a user utterance has been labeled as an entity.
// word = a word within the utterance that should already be labeled
// entity = name of entity the word was labled with
// *** This may work for multiple word labels, but you must only pass in the one
// *** word that uniquely identifies the labeled text
export function RemoveEntityLabel(word, entity, index = 0) {
  cy.Get('div.slate-editor').then(elements => {
    expect(elements.length).to.be.at.least(index - 1)
    cy.wrap(elements[index]).within(() => {
      cy.wrap(elements[index]).click()
      cy.Get('[data-testid="token-node-entity-value"] > span > span')
        .ExactMatch(word)
        .parents('.cl-entity-node--custom')
        .find('[data-testid="custom-entity-name-button"]')
        .contains(entity)
        .Click()

      cy.Get('button[title="Unselect Entity"]').Click()
    })
  })

}

// Verify that a specific word of a user utterance has been labeled as an entity.
//  word = a word within the utterance that should already be labeled
//  entity = name of entity the word should be labeled with
// *** This does NOT work for multiple words. ***
export function VerifyEntityLabel(word, entity) {
  cy.Get('[data-testid="token-node-entity-value"] > span > span')
    .ExactMatch(word)
    .parents('.cl-entity-node--custom')
    .find('[data-testid="custom-entity-name-button"]')
    .contains(entity)
}

// textEntityPairs object contains these two variables, it can be either an array or single instance:
//  text = a word within the utterance that should already be labeled
//  entity = name of entity to label the word with
export function VerifyEntityLabeledDifferentPopupAndClose(textEntityPairs) { VerifyEntityLabeledDifferentPopupAndClickButton(textEntityPairs, 'Close') }
export function VerifyEntityLabeledDifferentPopupAndAccept(textEntityPairs) { VerifyEntityLabeledDifferentPopupAndClickButton(textEntityPairs, 'Accept') }

function VerifyEntityLabeledDifferentPopupAndClickButton(textEntityPairs, buttonLabel) {
  cy.Get('.ms-Dialog-main')     // This returns multiple parent objects
    .contains('Entity is labelled differently in another user utterance') // Narrows it down to 1
    .parents('.ms-Dialog-main') // Back to the single parent object
    .within(() => {
      if (!Array.isArray(textEntityPairs)) textEntityPairs = [textEntityPairs]
      for (var i = 0; i < textEntityPairs.length; i++) VerifyEntityLabel(textEntityPairs[i].text, textEntityPairs[i].entity)

      // TODO: Wanted to use 'ExactMatch' instead of 'contains', but there is a weird problem...
      //       for some reson the first two button texts on this popup all end with a newline.
      cy.get('button.ms-Button').contains(buttonLabel).Click()
    })
}

export function VerifyEntityLabelWithinSpecificInput(textEntityPairs, index) {
  cy.Get('div.slate-editor').then(elements => {
    expect(elements.length).to.be.at.least(index - 1)
    cy.wrap(elements[index]).within(() => {
      if (!Array.isArray(textEntityPairs)) textEntityPairs = [textEntityPairs]
      for (var i = 0; i < textEntityPairs.length; i++) VerifyEntityLabel(textEntityPairs[i].text, textEntityPairs[i].entity)
    })
  })
}

export function InsertUserInputAfter(existingMessage, newMessage) {
  SelectChatTurnExactMatch(existingMessage)

  // This ODD way of clicking is to avoid the "Illegal Invocation" error that
  // happens with this specific UI element.
  cy.RunAndExpectDomChange(() => { Cypress.$('[data-testid="chat-edit-add-user-input-button"]')[0].click() })

  cy.Get('[data-testid="user-input-modal-new-message-input"]').type(`${newMessage}{enter}`)
}

// OPTIONAL index parameter lets you select other than the 1st 
// instance of a message as the point of insertion.
export function InsertBotResponseAfter(existingMessage, newMessage, index = 0) {
  cy.ConLog(`InsertBotResponseAfter(${existingMessage}, ${newMessage})`, `Start`)
  cy.Enqueue(() => { return SelectChatTurnExactMatch(existingMessage, index) }).then(indexOfSelectedChatTurn => {
    helpers.ConLog(`InsertBotResponseAfter(${existingMessage}, ${newMessage})`, `indexOfSelectedChatTurn: ${indexOfSelectedChatTurn}`)
    
    // This ODD way of clicking is to avoid the "Illegal Invocation" error that
    // happens with this specific UI element.
    cy.RunAndExpectDomChange(() => { Cypress.$('[data-testid="chat-edit-add-bot-response-button"]')[0].click() })
    
    if (newMessage) {
      cy.WaitForStableDOM()
      
      // TODO: Temporarily commented this out to see if tests start failing on this bug again.
      //cy.wait(1000) // TODO: Remove this after fixing Bug 1855: More Odd Rendering in Train Dialog Chat Pane
      
      cy.Enqueue(() => { 
        // Sometimes the UI has already automaticly selected the Bot response we want
        // so we need to confirm that we actually need to click on the action, 
        // otherwise an unnecessary message box pops up that we don't want to deal with.

        var chatMessages = helpers.StringArrayFromElementText(AllChatMessagesSelector)
        var indexOfInsertedBotResponse = indexOfSelectedChatTurn + 1
        if (chatMessages[indexOfInsertedBotResponse] != newMessage)
          scorerModal.ClickAction(newMessage, indexOfInsertedBotResponse)
      })
    }
    cy.ConLog(`InsertBotResponseAfter(${existingMessage}, ${newMessage})`, `End`)
  })
}
