var mongoose = require('mongoose');
var dbUrl ='mongodb://cheonsu:kang@ds031271.mongolab.com:31271/heroku_app33023007';

mongoose.connect(dbUrl);

// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});

require('../models/employee');
require('../models/team');