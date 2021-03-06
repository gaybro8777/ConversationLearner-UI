/**
* Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

import * as models from '../../support/Models'
import * as entities from '../../support/Entities'
import * as actions from '../../support/Actions'
import * as common from '../../support/Common'

describe('CreateModels', () => {
  it('Travel', () => {
    models.CreateNewModel('z-travel')
    entities.CreateNewEntity({ name: 'departure', resolverType: 'datetimeV2', expectPopup: true })
    entities.CreateNewEntity({ name: 'return', resolverType: 'datetimeV2' })
    actions.CreateNewActionThenVerifyInGrid({ response: 'You are leaving on $departure{enter} and returning on $return{enter}', requiredEntities: ['departure', 'return'] })
    actions.CreateNewActionThenVerifyInGrid({ response: 'When are you planning to travel?', disqualifyingEntities: ['departure', 'return'] })

    // Manually EXPORT this to fixtures folder and name it 'z-travel.cl'
  })
})