'use strict'
let AWS = require('aws-sdk');
// var sns = new AWS.SNS();
var request = require('request');

exports.handler = function(event, context) {
    request({
      url: 'https://api.github.com/users/cgregs32/events',
      method: 'GET',
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var obj = JSON.parse(body);
            
            // var email_params = {
            //     Message: quote,
            //     Subject: "Test Email From Lambda",
            //     TopicArn: process.env.TOPIC_ARN
            // };
            // sns.publish(email_params, context.done);
        }
      }
    );    
};

