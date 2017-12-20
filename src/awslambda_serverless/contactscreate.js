'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const querystring = require('querystring');

if (!AWS.config.region) {
  AWS.config.update({
    region: 'us-east-2'
  });
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback, res) => {
  const timestamp = new Date().getTime();
  const bodydata = JSON.stringify(event.body);
  const dataarray = bodydata.split('&');
  var arrsize = dataarray.length;

  var permalinkvalue = "";
  var namevalue = "";
  var emailvalue = "";
  var phonevalue = "";
  var messagevalue = "";

  for(var i=0; i < arrsize; i++){

    if(i == 0){
      var permalinkdata = dataarray[0];
      var permalink = permalinkdata.split('=');
      var permalinkdecode = querystring.unescape(permalink[1]);
      permalinkvalue = permalinkdecode;
    }

    if(i == 1){
      var namedata = dataarray[1];
      var name = namedata.split('=');
      var namedecode = querystring.unescape(name[1]);
      namevalue = namedecode;
    }

    if(i == 2){
      var emaildata = dataarray[2];
      var email = emaildata.split('=');
      var emaildecode = querystring.unescape(email[1]);
      emailvalue = emaildecode;
    }

    if(i == 3){
      var phonedata = dataarray[3];
      var phone = phonedata.split('=');
      var phonedecode = querystring.unescape(phone[1]);
      phonevalue = phonedecode;
    }

    if(i == 4){
      var messagedata = dataarray[4];
      var message = messagedata.split('=');
      var messagevaluearr = message[1];
      var messagevaluearrdata = messagevaluearr.split('"');
      var messagevaluemsg = messagevaluearrdata[0];
      var  messagedecodereplace = decodeURIComponent((messagevaluemsg + '').replace(/\+/g, '%20'));
      var messagedecode = querystring.unescape(messagedecodereplace);
      messagevalue = messagedecode;
    }

  }

  const permalinktabledata = permalinkvalue;
  const nametabledata = namevalue;
  const emailtabledata = emailvalue;
  const phonetabledata = phonevalue;
  const messagetabledata = messagevalue;
  
  if (typeof permalinktabledata !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      body: 'Couldn\'t create the todo item.Validation failed',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      website: permalinktabledata,
      name: nametabledata,
      email_address: emailtabledata,
      phone: phonetabledata,
      details: messagetabledata,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  
  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          'Content-Type': 'application/json' 
        },
        body: 'Couldn\'t create the todo item. An Error',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 302,
      headers: { 
          "Location": "http://www.maturify.com/contact.html"
        },
      body: "",
    };
    callback(null, response);
  });
};