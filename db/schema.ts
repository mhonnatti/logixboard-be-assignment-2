const dynamoose = require("dynamoose");

// Schema
export const NodeSchema = new dynamoose.Schema({
    "totalWeight": {
        type: Object,
        schema: {
            "weight": {
                "type": String,
                "get": (value: any) => new Number(value)
            },
            "unit": String
        }
    }
})

export const OrganizationSchema = new dynamoose.Schema({
    "type": String,
    "id": {
        type: String,
        hashKey: true
    },
    "code": String
})

export const ShipmentSchema = new dynamoose.Schema({
    "type": String,
    "referenceId": {
        type: String,
        hashKey: true
    },
    "organizations": {
        type: Array,
        schema: [String]
    },
    "estimatedTimeArrival": {
        "type": String,
        "set": (value: any) => value
    },
    "transportPacks": {
        type: Object,
        schema: {
            "nodes": {
                type: Array,
                schema: [NodeSchema]
            }
        }
    }
})
