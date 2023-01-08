import { Organization, Shipment, ShipmentWeight } from '../db/models'
import { getSuccessJsonResponse, getErrorJsonResponse } from '../utils/jsonResponses'

export const shipment = async (req: any, res: any) => {
  try{
    let data = removeNulls(req.body);
    let shipItem = new Shipment(data);
    let shipmentWeight = new ShipmentWeight(shipItem.serialize("WeightAggregator"));
    shipItem.save();
    shipmentWeight.save();
    res.json(getSuccessJsonResponse());
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err));
  }
}

export const organization = async (req: any, res: any) => {
  try {
    let data = removeNulls(req.body);
    let orgItem = new Organization(data);
    orgItem.save();
    res.json(getSuccessJsonResponse());
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err));
  }
}

function removeNulls(data: Object) {
  let cleanedData = {};

  Object.entries(data).forEach(([k, v]) => {
    if (v !== null && v !== undefined) cleanedData[k as keyof Object] = v;
  })

  return cleanedData;
}
