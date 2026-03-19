// Import Mongoose for MongoDB interaction
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
    // Username field: required string
    username: {
        type: String,
        required: true
    },
    // Password field: required string (note: in production, passwords should be hashed)
    password: {
        type: String,
        required: true
    },
    // Tasks field: array of strings, defaults to empty array
    tasks: {
        type: [String],
        default: []
    }
});

// Create and export the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;