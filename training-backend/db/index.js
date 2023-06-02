const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const config = require('../utils/config');

let db;

async function connect() {
  try {
    await mongoose.connect(config.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: config.dbName,
    });
    console.log('Connected to MongoDB');
    db = mongoose.connection;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

module.exports = {
  connect,
};
