/**
* Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

import * as models from '../support/Models'
import * as homePage from '../support/components/HomePage'

export function VisitHomePage()
{
  homePage.Visit()
  homePage.GetModelListRowCount()
}

export function CreateModel1() { CreateModel('Model1') }
export function CreateModel2() { CreateModel('Model2') }
export function CreateModel3() { CreateModel('Model3') }
export function CreateModel4() { CreateModel('Model4') }
export function CreateModel5() { CreateModel('Model5') }

function CreateModel(name)
{
  models.CreateNewModel(name)
  VisitHomePage()
}
