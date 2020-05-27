const express = require('express');
// const bodyParser = require('body-parser');
// const mongodb = require('mongodb');
// const ObjectID = mongodb.ObjectID;

const CONTACTS_COLLECTION = 'contacts';

const app = express();
// app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', function (err, client) {
// 	if (err) {
// 		console.log(err);
// 		process.exit(1);
// 	}
//
// 	// Save database object from the callback for reuse.
// 	db = client.db();
// 	console.log('Database connection ready');
//
// 	// Initialize the app.
// 	// const server = app.listen(process.env.PORT || 8080, function () {
// 	// 	const port = server.address().port;
// 	// 	console.log('App now running on port', port);
// 	// });
// });

app.listen(process.env.PORT || 4200, function () {
 	console.log('App now running');
});

// const server = app.listen(process.env.PORT || 4200, function () {
// 	const port = server.address().port;
// 	console.log('App now running on port', port);
// });



// CONTACTS API ROUTES BELOW

app.get('/', function (req, res) {
	res.send('Hello World!');
});


/*  '/api/contacts'
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get('/api/contacts', function(req, res) {
	res.send('/api/contacts ;)');
});

// app.post('/api/contacts', function(req, res) {
// });

/*  '/api/contacts/:id'
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get('/api/contacts/:id', function(req, res) {
	res.send('/api/contacts/:id');
});

//
// app.put('/api/contacts/:id', function(req, res) {
// });
//
// app.delete('/api/contacts/:id', function(req, res) {
// });

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
	console.log('ERROR: ' + reason);
	res.status(code || 500).json({'error': message});
}
