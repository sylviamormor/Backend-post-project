const dotenv = require('dotenv')

dotenv.config();

const production = {
    DATABASE_URL: process.env.PROD_DATABASE_URL,
    APP_PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

module.exports = production;