/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
*/

import * as helpers from '../support/Helpers'
import * as testListManager from '../support/TestListManager'

// This will queue up all test cases found in the testList array.
testListManager.AddToCypressTestList(testListManager.testList) 
