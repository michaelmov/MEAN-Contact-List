// Load required modules
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

// Connect express to Angular by specifying the root directory
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Get contacts from MongoDB
app.get('/contactlist', function (req, res) {
    // Check to see if GET request is received by server
    console.log('I received a GET request');

    // Retrive contactlist docs frm MongoDB
    db.contactlist.find(function(err, docs) {
       console.log(docs);
        res.json(docs);
    });
});

// Add new contact to MongoDB
app.post('/contactlist', function(req, res) {

    // Check to make sure that the new contact object is being sent to the server
    console.log(req.body);

    // Insert new contact into MongoDB and respond with the updateddocument
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    })
});

// Delete contact from MongoDB
app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;

    // Check to make sure that the contact id is being sent to the server
    console.log(id);

    // Remove contact from MongoDB
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {

        // Send updated document back to the client
        res.json(doc);
    });
});

// Get contact to edit by id
app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);

    // Find the object to edit by id
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {

        res.json(doc);
    });
});

// Update contact in MongoDB
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);

    // Find the object in MongoDB and modify it based on req.body parameters.
    db.contactlist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
            new: true}, function (err, doc) {

            // Return the updated objects back to the client
            res.json(doc);
        }
    );
});

app.listen(3000);
console.log('Server running on port 3000');