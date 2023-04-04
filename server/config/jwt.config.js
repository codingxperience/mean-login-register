// Require the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Use environment variables to set the secret key
module.exports = {
  secret: 'process.env.SECRET_KEY',
}
