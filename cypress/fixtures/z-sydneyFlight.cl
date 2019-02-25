﻿{
    "trainDialogs": [
        {
            "trainDialogId": "3e7effb4-6dbd-4480-b783-e0bc9379978d",
            "rounds": [
                {
                    "extractorStep": {
                        "textVariations": [
                            {
                                "text": "fly to sydney",
                                "labelEntities": [
                                    {
                                        "entityId": "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
                                        "startCharIndex": 7,
                                        "endCharIndex": 12,
                                        "entityText": "sydney",
                                        "resolution": {},
                                        "builtinType": "LUIS"
                                    }
                                ]
                            }
                        ]
                    },
                    "scorerSteps": [
                        {
                            "input": {
                                "filledEntities": [
                                    {
                                        "entityId": "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
                                        "values": [
                                            {
                                                "userText": "sydney",
                                                "displayText": "sydney",
                                                "builtinType": "LUIS",
                                                "resolution": {}
                                            }
                                        ]
                                    }
                                ],
                                "context": {},
                                "maskedActions": []
                            },
                            "labelAction": "c5f8b435-f7a5-49b7-9688-205b6891582c",
                            "metrics": {
                                "predictMetrics": {
                                    "blisTime": 0.011777162551879883,
                                    "contextDialogBlisTime": 0
                                }
                            }
                        }
                    ]
                },
                {
                    "extractorStep": {
                        "textVariations": [
                            {
                                "text": "next saturday",
                                "labelEntities": [
                                    {
                                        "entityId": "f7653340-a246-4fe1-88f2-413ecf3b1f82",
                                        "startCharIndex": 0,
                                        "endCharIndex": 12,
                                        "entityText": "next saturday",
                                        "resolution": {
                                            "values": [
                                                {
                                                    "timex": "2019-01-19",
                                                    "type": "date",
                                                    "value": "2019-01-19"
                                                }
                                            ]
                                        },
                                        "builtinType": "builtin.datetimeV2.date"
                                    }
                                ]
                            }
                        ]
                    },
                    "scorerSteps": [
                        {
                            "input": {
                                "filledEntities": [
                                    {
                                        "entityId": "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
                                        "values": [
                                            {
                                                "userText": "sydney",
                                                "displayText": "sydney",
                                                "builtinType": "LUIS",
                                                "resolution": {}
                                            }
                                        ]
                                    },
                                    {
                                        "entityId": "f7653340-a246-4fe1-88f2-413ecf3b1f82",
                                        "values": [
                                            {
                                                "userText": "next saturday",
                                                "displayText": "2019-01-19",
                                                "builtinType": "builtin.datetimeV2.date",
                                                "resolution": {
                                                    "values": [
                                                        {
                                                            "timex": "2019-01-19",
                                                            "type": "date",
                                                            "value": "2019-01-19"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "context": {},
                                "maskedActions": []
                            },
                            "labelAction": "54b34a33-2efc-4332-9399-67b4fb597337",
                            "metrics": {
                                "predictMetrics": {
                                    "blisTime": 0.011383771896362305,
                                    "contextDialogBlisTime": 0
                                }
                            }
                        }
                    ]
                },
                {
                    "extractorStep": {
                        "textVariations": [
                            {
                                "text": "coach",
                                "labelEntities": [
                                    {
                                        "entityId": "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                                        "startCharIndex": 0,
                                        "endCharIndex": 4,
                                        "entityText": "coach"
                                    }
                                ]
                            },
                            {
                                "text": "coach class",
                                "labelEntities": [
                                    {
                                        "entityId": "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                                        "startCharIndex": 0,
                                        "endCharIndex": 10,
                                        "entityText": "coach class"
                                    }
                                ]
                            },
                            {
                                "text": "first class",
                                "labelEntities": [
                                    {
                                        "entityId": "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                                        "startCharIndex": 0,
                                        "endCharIndex": 10,
                                        "entityText": "first class"
                                    }
                                ]
                            },
                            {
                                "text": "first",
                                "labelEntities": [
                                    {
                                        "entityId": "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                                        "startCharIndex": 0,
                                        "endCharIndex": 4,
                                        "entityText": "first"
                                    }
                                ]
                            }
                        ]
                    },
                    "scorerSteps": [
                        {
                            "input": {
                                "filledEntities": [
                                    {
                                        "entityId": "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
                                        "values": [
                                            {
                                                "userText": "sydney",
                                                "displayText": "sydney",
                                                "builtinType": "LUIS",
                                                "resolution": {}
                                            }
                                        ]
                                    },
                                    {
                                        "entityId": "f7653340-a246-4fe1-88f2-413ecf3b1f82",
                                        "values": [
                                            {
                                                "userText": "next saturday",
                                                "displayText": "2019-01-19",
                                                "builtinType": "builtin.datetimeV2.date",
                                                "resolution": {
                                                    "values": [
                                                        {
                                                            "timex": "2019-01-19",
                                                            "type": "date",
                                                            "value": "2019-01-19"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "entityId": "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                                        "values": [
                                            {
                                                "userText": "coach",
                                                "displayText": "coach",
                                                "builtinType": null,
                                                "resolution": null
                                            }
                                        ]
                                    }
                                ],
                                "context": {},
                                "maskedActions": []
                            },
                            "labelAction": "3621f7d5-6fa5-49cf-bd14-cad7b6980613",
                            "metrics": {
                                "predictMetrics": {
                                    "blisTime": 0.011664867401123047,
                                    "contextDialogBlisTime": 0
                                }
                            }
                        }
                    ]
                }
            ],
            "initialFilledEntities": [],
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "lastModifiedDateTime": "2019-01-10T19:40:55+00:00"
        }
    ],
    "actions": [
        {
            "actionId": "c5f8b435-f7a5-49b7-9688-205b6891582c",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "actionType": "TEXT",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"soonest departure date?\",\"marks\":[]}]}]}]}}}",
            "isTerminal": true,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [
                "03d69c0f-2e4c-4f21-963d-ef58b2814b06"
            ],
            "negativeEntities": [
                "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                "f7653340-a246-4fe1-88f2-413ecf3b1f82"
            ]
        },
        {
            "actionId": "54b34a33-2efc-4332-9399-67b4fb597337",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "actionType": "TEXT",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"first class or coach?\",\"marks\":[]}]}]}]}}}",
            "isTerminal": true,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [
                "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
                "f7653340-a246-4fe1-88f2-413ecf3b1f82"
            ],
            "negativeEntities": [
                "e992b17c-ffc4-405f-a9fa-38cf297fec3b"
            ],
            "suggestedEntity": "e992b17c-ffc4-405f-a9fa-38cf297fec3b"
        },
        {
            "actionId": "3b342ac7-94ce-4227-a00d-d09f82806d55",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "actionType": "END_SESSION",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"0\",\"marks\":[]}]}]}]}}}",
            "isTerminal": true,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [
                "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
                "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
                "f7653340-a246-4fe1-88f2-413ecf3b1f82"
            ],
            "negativeEntities": []
        },
        {
            "actionId": "3621f7d5-6fa5-49cf-bd14-cad7b6980613",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "actionType": "TEXT",
            "payload": "{\"json\":{\"kind\":\"value\",\"document\":{\"kind\":\"document\",\"data\":{},\"nodes\":[{\"kind\":\"block\",\"type\":\"line\",\"isVoid\":false,\"data\":{},\"nodes\":[{\"kind\":\"text\",\"leaves\":[{\"kind\":\"leaf\",\"text\":\"enjoy your trip. you are booked on Qantas\",\"marks\":[]}]}]}]}}}",
            "isTerminal": false,
            "requiredEntitiesFromPayload": [],
            "requiredEntities": [
                "e992b17c-ffc4-405f-a9fa-38cf297fec3b"
            ],
            "negativeEntities": []
        }
    ],
    "entities": [
        {
            "entityId": "03d69c0f-2e4c-4f21-963d-ef58b2814b06",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "entityName": "destinationCity",
            "entityType": "LUIS",
            "isMultivalue": false,
            "isNegatible": false,
            "resolverType": "none"
        },
        {
            "entityId": "f7653340-a246-4fe1-88f2-413ecf3b1f82",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "entityName": "builtin-datetimev2",
            "entityType": "datetimeV2",
            "isMultivalue": false,
            "isNegatible": false
        },
        {
            "entityId": "e992b17c-ffc4-405f-a9fa-38cf297fec3b",
            "createdDateTime": "2019-01-10T19:40:55.9212427+00:00",
            "entityName": "fareClass",
            "entityType": "LUIS",
            "isMultivalue": false,
            "isNegatible": false,
            "resolverType": "none"
        }
    ],
    "packageId": "604dfff5-7266-410f-a200-323d216886b9"
}