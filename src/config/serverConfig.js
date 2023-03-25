const dotenv = require("dotenv");

dotenv.config(); //calls out env file

module.exports = {
  PORT: process.env.PORT,
};
