const mongoose = require('mongoose');

// Schema
const recipeSchema = new mongoose.Schema(
	{
		ingredients: String,
		link: String,
		name: String
	},
	{
		timestamps: true
	}
);

// Export model
module.exports = mongoose.model('Recipe', recipeSchema);
