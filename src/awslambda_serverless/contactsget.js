'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

module.exports.get = (event, context, callback) => {
    const response = {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      body: 'Serverless test!!'
    };
    callback(null, response);
  };