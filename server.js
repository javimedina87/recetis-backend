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

// Models
const TodoModel = require('./models/todo');
const RecipeModel = require('./models/recipe');

app.listen(process.env.PORT || 4200, function () {
	console.log('Server running !');

	mongoose.connect('mongodb://shavin:test1234@ds149676.mlab.com:49676/heroku_78srf016', (err) => {
		if (err) throw err;
	});

	mongoose.connection.on('error', () => console.log('Error conecting with database...'));
});

// TODO check CORS


/* API Routes */

// Todos
app.get('/api/todos', async (req, res) => {
	const todos = await TodoModel.find({}, 'name'); // only return 'name'

	res.send(todos); // TODO return only name
});

// app.get('/api/todos/:id', async (req, res) => {
// 	try {
// 		const todo = await TodoModel.findOne({ _id: req.params.id }) // TODO check this _id
//
// 		res.send(todo)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Todo doesn't exist!" })
// 	}
// });

app.post('/api/todos', async (req, res) => {
	try {
		const todo = new TodoModel({
			name: req.body.name
		});

		await todo.save();

		const response = await TodoModel.find({}, 'name');

		res.send(response);
	} catch {
		res.status(404)
		res.send({ error: "Todo doesn't saved!" })
	}
});

// Recipes
app.get('/api/recipes', async (req, res) => {
	await RecipeModel.find().sort({_id: 'desc'}).exec(function(err, resp) {
		res.send(resp);
	});

});

app.post('/api/recipes', async (req, res) => {
	try {
		const recipe = new RecipeModel({
			name: req.body.name,
			ingredients: req.body.ingredients,
			link: req.body.link
		});

		await recipe.save();

		await RecipeModel.find().sort({_id: 'desc'}).exec(function(err, resp) {
			res.send(resp);
		});
	} catch {
		res.status(404)
		res.send({ error: "Recipe doesn't saved!" })
	}
});




app.get('*', function (req, res) {
	res.send('Not found');
});


// app.patch("api/todos/:id", async (req, res) => {
// 	try {
// 		const todo = await TodoModel.findOne({ _id: req.params.id }) // TODO check this _id
//
// 		// if (req.body.title) {
// 		// 	todo.title = req.body.title
// 		// }
// 		//
// 		// if (req.body.content) {
// 		// 	todo.content = req.body.content
// 		// }
//
// 		await todo.save()
//
// 		res.send(todo)
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Todo doesn't exist!" })
// 	}
// })
//
// app.delete("/todos/:id", async (req, res) => {
// 	try {
// 		await Todo.deleteOne({ _id: req.params.id })
//
// 		res.status(204).send()
// 	} catch {
// 		res.status(404)
// 		res.send({ error: "Todo doesn't exist!" })
// 	}
// })



// Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
// 	console.log('ERROR: ' + reason);
// 	res.status(code || 500).json({'error': message});
// }
