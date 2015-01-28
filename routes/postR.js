var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var router = express.Router();

router.post('/employees', function(req, res, next) {
	var model1 = new Employee( {
	    id: '12',
	    name: {
	      first: req.body.first,
	      last: req.body.last
	    }
	  });

	model1.save(function (err, fluffy) {
		if (err){
			return console.error(err);
		} 
		console.log("saved new model1");
		res.end();
	});
});



module.exports = router;