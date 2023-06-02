// config.js
module.exports = {
  mongoURL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xdyuxkc.mongodb.net/?retryWrites=true&w=majority`,
  dbName: 'Training'
};
