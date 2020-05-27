const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


// mongoose.connect('mongodb://shavin:test1234@ds149676.mlab.com:49676/heroku_78srf016',
// 	{
// 		useNewUrlParser: true
// 	}
// );

// Schema
const ideaSchema = new mongoose.Schema({
	name: String
});

// Model
const IdeaModel = mongoose.model('Idea', ideaSchema);
// const idea = new IdeaModel({ name: '...idea desde base de datos...' });



app.listen(process.env.PORT || 4200, function () {
	console.log('Server running !');

	mongoose.connect('mongodb://shavin:test1234@ds149676.mlab.com:49676/heroku_78srf016', (err) => {
		if (err) throw err;
	});

	mongoose.connection.on('error', () => console.log('Error conecting with database...'));
});

/* API Routes */
app.get('/api/getIdeas', function (req, res) {
	res.send('getIdeas');
});

app.post('/api/addIdea/:ideaId', function(req, res) {
	const idea = new IdeaModel({ name: 'idea api bbdd' });

	console.log('req.params.ideaId', req.params.ideaId);
	// console.log('res', res);


	idea.save(function(err) {
		if (err) throw err;

		console.log('Idea created ');
		res.send('idea created...');
	})
});



app.get('*', function (req, res) {
	res.send('Not found');
});

// app.post('/api/contacts', function(req, res) {
// });
//
// app.put('/api/contacts/:id', function(req, res) {
// });
//
// app.delete('/api/contacts/:id', function(req, res) {
// });

// Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
// 	console.log('ERROR: ' + reason);
// 	res.status(code || 500).json({'error': message});
// }
