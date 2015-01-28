var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var router = express.Router();

router.delete('/employees/:employeeId', function (req, res, next) {
  // Remove this or mongoose will throw an error
  // because we would be trying to update the mongo ID
  console.info('Deleting teams');
  Employee.remove({
    id: req.params.employeeId
  }, function(error, response) {
    if (error) {
      console.error('Error deleting teams: ' + error);
    }
    console.info('Done deleting teams');
    res.json(response);
  });
});


module.exports = router;