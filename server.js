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

// Schemas
const ideaSchema = new mongoose.Schema({
	name: String
});
const recipeSchema = new mongoose.Schema({
	name: String,
	ingredients: String,
	link: String
});

// Models
const IdeaModel = mongoose.model('Idea', ideaSchema);
const RecipeModel = mongoose.model('Recipe', recipeSchema);

app.listen(process.env.PORT || 4200, function () {
	console.log('Server running !');

	mongoose.connect('mongodb://shavin:test1234@ds149676.mlab.com:49676/heroku_78srf016', (err) => {
		if (err) throw err;
	});

	mongoose.connection.on('error', () => console.log('Error conecting with database...'));
});

// TODO check CORS


/* API Routes */

// Ideas
app.get('/api/ideas', async (req, res) => {
	const ideas = await IdeaModel.find();

	res.send(ideas); // TODO return only name
});

// app.get('/api/ideas/:id', async (req, res) => {
// 	try {
// 		const idea = await IdeaModel.findOne({ _id: req.params.id }) // TODO check this _id
//
// 		res.send(idea)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Idea doesn't exist!" })
// 	}
// });

app.post('/api/ideas', async (req, res) => {
	try {
		const idea = new IdeaModel({
			name: req.body.name
		});

		await idea.save();

		const response = await IdeaModel.find();

		res.send(response);
	} catch {
		res.status(404)
		res.send({ error: "Idea doesn't saved!" })
	}
});

// Recipes
app.get('/api/recipes', async (req, res) => {
	const recipes = await RecipeModel.find();

	res.send(recipes);
});

app.post('/api/recipes', async (req, res) => {
	try {
		const recipe = new RecipeModel({
			name: req.body.name,
			ingredients: req.body.ingredients,
			link: req.body.link
		});

		await recipe.save();

		const response = await RecipeModel.find();
		console.log('response recipe', response);

		res.send(response);
	} catch {
		res.status(404)
		res.send({ error: "Recipe doesn't saved!" })
	}
});




app.get('*', function (req, res) {
	res.send('Not found');
});


// app.patch("api/ideas/:id", async (req, res) => {
// 	try {
// 		const idea = await IdeaModel.findOne({ _id: req.params.id }) // TODO check this _id
//
// 		// if (req.body.title) {
// 		// 	idea.title = req.body.title
// 		// }
// 		//
// 		// if (req.body.content) {
// 		// 	idea.content = req.body.content
// 		// }
//
// 		await idea.save()
//
// 		res.send(idea)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Idea doesn't exist!" })
// 	}
// })
//
// app.delete("/ideas/:id", async (req, res) => {
// 	try {
// 		await Idea.deleteOne({ _id: req.params.id })
//
// 		res.status(204).send()
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Idea doesn't exist!" })
// 	}
// })



// Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
// 	console.log('ERROR: ' + reason);
// 	res.status(code || 500).json({'error': message});
// }
