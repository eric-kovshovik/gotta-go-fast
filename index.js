'use strict'
let AWS = require('aws-sdk');
var sns = new AWS.SNS();
var request = require('request');

exports.handler = function(event, context) {
    var options = {
        url: `https://api.github.com/users/${process.env.USERNAME}/events`,
        headers: {  
            'User-Agent': 'request'
        }
    };
    
    function callback (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            var filtered = obj.filter(function(x) { return x.type == "PushEvent"; });
            
            var date = new Date();
            var dayAgo = date.setDate(date.getDate() -1);
            var dates = filtered.map(x => Date.parse(x.created_at)).filter(function(x) { return x >= dayAgo; });
            
            var email_params = {
                Message: `Number of public pushes by Eric in 24h: ${dates.length}`,
                Subject: "Hey there fella",
                TopicArn: process.env.TOPIC_ARN
            };
            sns.publish(email_params, context.done);
        }
    }
    
    request(options, callback);    
};

