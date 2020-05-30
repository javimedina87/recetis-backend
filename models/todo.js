const mongoose = require('mongoose');

// Schema
const todoSchema = new mongoose.Schema(
	{
		name: String
	},
	{
		timestamps: true
	}
);

// Export model
module.exports = mongoose.model('Todo', todoSchema);
