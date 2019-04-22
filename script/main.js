var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var globalVariable = require('./globalVariable');



// API SendInBlue
var Sendinblue = require('sib-api-v3-sdk');
var defaultClient = Sendinblue.ApiClient.instance;
// autentification:
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = globalVariable.apiKey;


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/submit',function(req, res){
    const contact = req.body.email;
    insert(contact)
    res.redirect("https://google.com");
});

function insert(contact){


// Configure API key authorization: api-key

var apiInstance = new Sendinblue.ContactsApi();

var createContact = new Sendinblue.CreateContact(); // CreateContact | Values to create a contact
createContact = { 'email' : contact , 'listIds' :[2] };

apiInstance.createContact(createContact).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});
};

// Create server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
