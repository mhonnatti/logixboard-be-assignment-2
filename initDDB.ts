const dynamoDbLocal = require('dynamo-db-local');
const dynamoose = require("dynamoose");

export default () => {
  /*
  const dynamoDbLocalProcess = dynamoDbLocal.spawn({
    path: `${__dirname}/db`,
    port: 8000,
    sharedDb: true
  });
  */

  dynamoose.aws.ddb.local();
}

