/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

import * as modelPage from '../support/components/ModelPage'
import * as entitiesGrid from './components/EntitiesGrid'
import * as entityModal from '../support/components/EntityModal'

export function CreateNewEntity({name, multiValued, negatable, resolverType, type = 'Custom Trained', expectPopup = false})
{
  modelPage.NavigateToEntities()
  entitiesGrid.ClickButtonNewEntity()

  if (type != 'Custom Trained') SelectEntityType(type)
  if (name) entityModal.TypeEntityName(name)
  if (multiValued) entityModal.ClickMultiValueCheckbox()
  if (negatable) entityModal.ClickNegatableCheckbox()
  if (resolverType) entityModal.SelectResolverType(resolverType)

  entityModal.ClickCreateButton()
  if (expectPopup || (type != 'Custom Trained' && type != 'Programmatic')) entityModal.ClickOkButtonOnNoteAboutPreTrained()

  if (name) entitiesGrid.VerifyItemInList(name)
  else entitiesGrid.VerifyItemInList(`builtin-${type.toLowerCase()}`)
}

export function SelectEntityType(type)
{
  entityModal.ClickEntityTypeDropdown()
  entityModal.ClickEntityType(type)
}

export const pretrainedEntityTypes = 
[
  "datetimeV2",
  "number",
  "ordinal",
  "percentage",
  "temperature",
  "dimension",
  "money",
  "age",
  "url",
  "email",
  "phonenumber",
]