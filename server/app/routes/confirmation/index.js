'use strict';
var router = require('express').Router();
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('9wkzBReoZI_aL6h2c-asFQ');
module.exports = router;

router.put('/code',function (req, res, next){
	var code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
	console.log("code",code)
	var message = {
        "subject": "Your confirmation code is "+String(code),
        "from_email": "gavinyoung1994@gmail.com",
        "to": [{
                "email": req.body.email+"@simons-rock.edu",
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false, 
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        res.json({
        	code: 1111
        });
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
})