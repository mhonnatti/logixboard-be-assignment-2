import { Item } from 'dynamoose/dist/Item';
import { Organization, Shipment } from '../db/models'
import { getSuccessJsonResponse, getErrorJsonResponse } from '../utils/jsonResponses'

export const shipments = async (req: any, res: any) => {
  try {
    const shipment: Item = await Shipment.get(req.params['referenceId']);
    console.log(shipment.toJSON().transportPacks.nodes[0])
    res.json(getSuccessJsonResponse(undefined, shipment.toJSON()))
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err))
  }
}

export const organizations = async (req: any, res: any) => {
  try {
    const org: Item = await Organization.get(req.params['id']);
    console.log(org.toJSON())
    res.json(getSuccessJsonResponse(undefined, org.toJSON()))
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json(getErrorJsonResponse(err))
  }
}
