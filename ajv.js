const Ajv = require("ajv")
const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
const { body } = require('./ajv.json');

const schema = {
  "$async": true,
  "type": "object",
  "properties": {
    "session": {
      "type": "string"
    },
    "queryResult": {
      "type": "object",
      "properties": {
        "fulfillmentText": {
          "type": "string"
        },
        "intent": {
          "type": "object",
          "properties": {
            "displayName": {
              "type": "string"
            }
          },
          "required": [
            "displayName"
          ]
        },
        "outputContexts": {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "type": "array",
          "items": {
            "type": "object",
            "required": [
              "name",
              "parameters"
            ],
            "properties": {
              "name": {
                "type": "string"
              },
              "parameters": {
                "type": "object",
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "brand_name": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "brand_name"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "flex_auth_key": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "flex_auth_key"
                    ],
                    "additionalProperties": false
                  },
                  {
                    "type": "object",
                    "properties": {
                      "brand_name": false,
                      "flex_auth_key": false,
                      "additionalProperties": true
                    }
                  }
                ]
              }
            }
          },
          "allOf": [
            {
              "contains": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "parameters": {
                    "type": "object",
                    "properties": {
                      "brand_name": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "brand_name"
                    ],
                    "additionalProperties": false
                  }
                }
              }
            },
            {
              "contains": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "parameters": {
                    "type": "object",
                    "properties": {
                      "flex_auth_key": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "flex_auth_key"
                    ],
                    "additionalProperties": false
                  }
                }
              }
            }
          ]
        }
      },
      "required": [
        "fulfillmentText"
      ]
    }
  },
  "required": [
    "session"
  ]
}

const validate = ajv.compile(schema)

const data = body;
validate(data)
  .then(function (data) {
    console.log("Data is valid", data) // { userId: 1, postId: 19 }
  })
  .catch(function (err) {
    if (!(err instanceof Ajv.ValidationError)) throw err
    // data is invalid
    console.log("Validation errors:", err.errors)
  })

// const valid = validate(data)
  
// if (!valid) console.log(validate.errors)
