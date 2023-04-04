// Require the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Use environment variables to set the MongoDB connection URL
module.exports = {
  url: process.env.DB_URL,
};