import {shipment, organization} from './controllers/ingress';
import {shipments, organizations, totalWeights} from './controllers/egress';
import initDDB from './initDDB';

const express = require('express')
const bodyParser = require("body-parser");

initDDB();

const app = express()
app.use(bodyParser.json());
const port = 3000

app.post('/shipment', shipment)

app.post('/organization', organization)

app.get('/shipments/:referenceId', shipments)

app.get('/organizations/:id', organizations)

app.get('/weights/total/:unit', totalWeights)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
