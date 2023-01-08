import { Item } from 'dynamoose/dist/Item';
import { Organization, Shipment, ShipmentWeight } from '../db/models'
import { getSuccessJsonResponse, getErrorJsonResponse } from '../utils/jsonResponses'

const { convert } = require("convert");

export const shipments = async (req: any, res: any) => {
  try {
    let shipment: any = (await Shipment.get(req.params['referenceId'])).toJSON();
    let orgCodes = shipment.organizations;

    if (orgCodes !== null && orgCodes !== undefined && orgCodes.length > 0) {
      let fullOrgs: Array<Object> = [];

      for (let i=0; i<orgCodes.length; i++) {
        let orgCode: String = orgCodes[i];

        let org = await Organization.query("code").eq(orgCode).using("orgCodeIndex").exec();
        if (org.length > 0) {
          fullOrgs.push(org[0]);
        } else {
          fullOrgs.push({})
        }
      };

      shipment.organizations = fullOrgs;
    }

    res.json(getSuccessJsonResponse(undefined, shipment))
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err))
  }
}

export const organizations = async (req: any, res: any) => {
  try {
    const org: Item = await Organization.get(req.params["id"]);
    res.json(getSuccessJsonResponse(undefined, org.toJSON()))
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err))
  }
}

export const totalWeights = async (req: any, res: any) => {
  try {
    let lastKey = false, weight: Number = 0, unit = req.params["unit"]?.toLowerCase();

    while (lastKey !== undefined) {
      let scannedItems;

      if (lastKey)
        scannedItems = await ShipmentWeight.scan().using("weightIndex").startAt(lastKey).exec();
      else {
        scannedItems = await ShipmentWeight.scan().using("weightIndex").exec();
      }

      scannedItems.forEach((item: any) => {
        weight += item.shipmentWeightInGrams;
      })

      lastKey = scannedItems.lastKey;
    }

    if (unit && unit !== "grams") {
      weight = convert(weight, "grams").to(unit);
    }

    res.json(getSuccessJsonResponse(undefined, {"weight": weight, "unit": unit}))
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err))
  }
}
