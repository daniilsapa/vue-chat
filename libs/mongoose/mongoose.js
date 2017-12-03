const mongoose = require('mongoose');
const config = require('../../config/mongoose.json');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.uri, {useMongoClient: true});

module.exports = mongoose;