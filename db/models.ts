import { OrganizationSchema, ShipmentSchema, ShipmentWeightSchema } from './schema';

const dynamoose = require("dynamoose");
const { convert } = require("convert");

// Models
const Organization = dynamoose.model("Organization", OrganizationSchema);
const Shipment = dynamoose.model("Shipment", ShipmentSchema);

Shipment.serializer.add("WeightAggregator", {
  "include": ["referenceId"],
  "modify": (serialized: any, original: any) => {
    let nodes = original?.transportPacks?.nodes;
    let nodeWeightsInGrams: Array<Number> = [], shipmentWeightInGrams = 0;

    if (nodes !== null && nodes !== undefined && nodes.length > 0) {
      nodes.forEach((node: any)  => {
        let weight: String = node?.totalWeight?.weight;
        let unit: String = node?.totalWeight?.unit;

        if(weight && unit) {
          let weightInGrams = convert(Number(weight), unit.toLowerCase()).to("grams");

          nodeWeightsInGrams.push(weightInGrams);
          shipmentWeightInGrams += weightInGrams;
        }
      })
    }

    return {...serialized, "nodeWeightsInGrams": nodeWeightsInGrams, "shipmentWeightInGrams": shipmentWeightInGrams}
  }
});

const ShipmentWeight = dynamoose.model("ShipmentWeight", ShipmentWeightSchema);

export { Organization, Shipment, ShipmentWeight };
