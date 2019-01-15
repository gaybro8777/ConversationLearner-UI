/**
* Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/
export function VerifyPageTitle()         { cy.get('[data-testid="create-an-action-title"]').contains('Create an Action').should('be.visible') }
export function ClickNewAction()          { cy.get('[data-testid="actions-button-create"]').click() }
export function ClickCreateButton()       { cy.get('[data-testid="actioncreator-button-create"]').click() }
export function CheckWaitForResponse()    { throw 'CheckWaitForResponse is NOT supported'} // Since this is a button and not a real check box it is difficult/ugly to manage the state. This defaults to checked.
export function UncheckWaitForResponse()  { cy.get('.cl-modal_body').within(() => { cy.get('.ms-Checkbox-text').click() })}

export function TypeExpectedEntity(entityNames: string[])         { TypeMultipleEntities('.cl-action-creator--expected-entities', entityNames) }
export function TypeRequiredEntities(entityNames: string[])       { TypeMultipleEntities('.cl-action-creator--required-entities', entityNames) }
export function TypeDisqualifyingEntities(entityNames: string[])  { TypeMultipleEntities('.cl-action-creator--disqualifying-entities', entityNames) }

export function TypeResponse(textToType: string) 
{
  cy.get('.cl-modal_body').within(() => 
  {
    cy.get('div[data-slate-editor="true"]')
      .clear()
      .type(textToType)
  })
}

// Pass in an undefined 'entityNames' to just clear the field
function TypeMultipleEntities(selector: string, entityNames: string[])
{
  if (!entityNames) entityNames = []
  else if (!Array.isArray(entityNames)) entityNames = [entityNames]

  cy.get('.cl-modal_body').within(() => 
  {
    cy.get(selector).within(() => 
    {
      cy.get('.ms-BasePicker-input')
        .then((element) =>
        {
          for(var i = 0; i < entityNames.length; i++) { cy.wrap(element).type(`$${entityNames[i]}`).wait(1000).type('{enter}') }
        })
    })
  })
}

export function SelectTypeText() 
{
  cy.get('[data-testid="dropdown-action-type"]')
    .should("be.visible")
    .click()
    .click()
}

export function TypeLetterResponse(letter: string) 
{
  //if (letter ==="$") letter = '{shift}4';  //TODO: cypress is not resolving shift^4 to trigger entity finder event.
  cy.get('.cl-modal_body').within(() => 
  {
    cy.get('div[data-slate-editor="true"]')
      //.type(letter, { release: false })   //enable if the key combination works.
      .clear()
      .type(letter)
      .trigger('onChange')
  })
}
