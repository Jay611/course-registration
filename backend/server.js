process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configuredExpress = require('./config/express');
const configuredMongoose = require('./config/mongoose');
const db = configuredMongoose();
const app = configuredExpress();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));

module.exports = app;