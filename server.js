const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const corsOptions = {
	origin: 'http://localhost:3000'
}

app.use(cors());

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

// TODO check CORS

/* API Routes */
app.get('/api/ideas', async (req, res) => {
	const ideas = await IdeaModel.find();

	res.send(ideas); // TODO return only name
});

app.get('/api/ideas/:id', async (req, res) => {
	try {
		const idea = await IdeaModel.findOne({ _id: req.params.id }) // TODO check this _id

		res.send(idea)
	} catch {
		res.status(404)
		res.send({ error: "Idea doesn't exist!" })
	}
});

app.post('/api/ideas', async (req, res) => {
	console.log('req.body.name: ', req.body.name);

	const idea = new IdeaModel({
		name: req.body.name
	});

	await idea.save();

	res.send(idea); // TODO test this response
});


app.patch("api/ideas/:id", async (req, res) => {
	try {
		const idea = await IdeaModel.findOne({ _id: req.params.id }) // TODO check this _id

		// if (req.body.title) {
		// 	idea.title = req.body.title
		// }
		//
		// if (req.body.content) {
		// 	idea.content = req.body.content
		// }

		await idea.save()

		res.send(idea)
	} catch {
		res.status(404)
		res.send({ error: "Idea doesn't exist!" })
	}
})

app.delete("/ideas/:id", async (req, res) => {
	try {
		await Idea.deleteOne({ _id: req.params.id })

		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Idea doesn't exist!" })
	}
})





app.get('*', function (req, res) {
	res.send('Not found');
});


// Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
// 	console.log('ERROR: ' + reason);
// 	res.status(code || 500).json({'error': message});
// }
