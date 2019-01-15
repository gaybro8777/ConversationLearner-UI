/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

export function VerifyPageTitle()           { cy.get('[data-testid="log-dialogs-title"]').contains('Log Dialogs').should('be.visible') }
export function CreateNewLogDialogButton()  { cy.get('[data-testid="log-dialogs-new-button"]').Click() }
