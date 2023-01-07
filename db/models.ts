import { shipment } from 'controllers/ingress';
import {OrganizationSchema, ShipmentSchema} from './schema'

const dynamoose = require("dynamoose");

// Models
export const Organization = dynamoose.model("Organization", OrganizationSchema);
export const Shipment = dynamoose.model("Shipment", ShipmentSchema);
