import mongoose from 'mongoose'

// Create a schema for the user
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
})

// Create a model for the user
const UserModel = mongoose.model('users', userSchema)

// Export the model

export { UserModel }
