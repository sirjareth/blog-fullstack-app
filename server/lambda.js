const serverlessExpress = require('@codegenie/serverless-express');
const app = require('./server.js');

exports.handler = serverlessExpress(app);