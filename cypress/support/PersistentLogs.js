/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */

//if (Test) alert(`PersistentLogs.js1 - Test is ${(Test)? 'undefined' : 'defined'}`)

global.Test = {}
Test.globalTestObject = true

//alert(`PersistentLogs.js2 - Test is ${Test == undefined? 'undefined' : 'defined'}`)


var testCaseRegistry = []
var indexRegistry = 0
var logEntries = ''

// Override the original console.log() function
const originalConsolLog = console.log

// This becomes the effective console.log() function.
console.log = function (message) {
  originalConsolLog.apply(console, arguments)
  logEntries += message + '\r\n'
}

// This will be called by the test list manager to register each test case
// in the order the tests will be run in.
Cypress.PersistentLogs = {}
Cypress.PersistentLogs.RegisterTestCase = (testGroupName, testName) => {
  testCaseRegistry.push(`${testGroupName}/${testName}`)
}

// After each test case ends...
afterEach(() => {
  let logFileName = `./results/cypress/${testCaseRegistry[indexRegistry++]}.${Cypress.moment().format("YY.MM.DD.HH.mm.ss..SSS")}.log`
  cy.writeFile(logFileName, logEntries).then(() => logEntries = '')
})
