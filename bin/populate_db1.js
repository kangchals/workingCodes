var async = require('async');
var mongoose = require('mongoose');
// node's modules
// Node has a simple module loading system. In Node, files and modules are in one-to-one correspondence. As an example, foo.js loads the module circle.js in the same directory.
require(process.cwd() + '/lib/connection');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');

var data = {
  employees: [
    {
      id: 'q1',
      name: {
        first: 'Colin',
        last: 'Ihrig'
      },
      image: 'images/employees/1000003.png',
      address: {
        lines: ['11 Wall Street'],
        city: 'New York',
        state: 'NY',
        zip: 10118
      }
    },
    {
      id: 'q2',
      name: {
        first: 'Adam',
        last: 'Bretz'
      },
      address: {
        lines: ['46 18th St', 'St. 210'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15222
      }
    },
    {
      id: 'q3',
      name: {
        first: 'Matt',
        last: 'Liegey'
      },
      address: {
        lines: ['2 S Market Square', '(Market Square)'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15222
      }
    },
    {
      id: 'q4',
      name: {
        first: 'Aleksey',
        last: 'Smolenchuk'
      },
      image: 'images/employees/1000025.png' /* invalid image */,
      address: {
        lines: ['3803 Forbes Ave'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15213
      }
    },
    {
      id: 'q5',
      name: {
        first: 'Sarah',
        last: 'Gay'
      },
      address: {
        lines: ['8651 University Blvd'],
        city: 'Pittsburgh',
        state: 'PA',
        zip: 15108
      }
    },
    {
      id: 'q6',
      name: {
        first: 'Dave',
        last: 'Beshero'
      },
      address: {
        lines: ['1539 Washington Rd'],
        city: 'Mt Lebanon',
        state: 'PA',
        zip: 15228
      }
    }
  ],
  teams: [
    {
      name: 'Software and Services Group'
    },
    {
      name: 'Project Development'
    }
  ]
};

var deleteEmployees = function(callback) {
  console.info('Deleting employees');
  Employee.remove({}, function(error, response) {
    if (error) {
      console.error('Error deleting employees: ' + error);
    }

    console.info('Done deleting employees');
    callback();
  });
};

var addEmployees = function(callback) {
  console.info('Adding employees');
  Employee.create(data.employees, function (error) {
    if (error) {
      console.error('Error: ' + error);
    }

    console.info('Done adding employees');
    callback();
  });
};

var deleteTeams = function(callback) {
  console.info('Deleting teams');
  Team.remove({}, function(error, response) {
    if (error) {
      console.error('Error deleting teams: ' + error);
    }

    console.info('Done deleting teams');
    callback();
  });
};

var addTeams = function(callback) {
  console.info('Adding teams');
  Team.create(data.teams, function (error, team1) {
    if (error) {
        console.error('Error: ' + error);
    } else {
        data.team_id = team1._id;
    }

    console.info('Done adding teams');
    callback();
  });
};

var updateEmployeeTeams = function (callback) {
  console.info('Updating employee teams');
  var team = data.teams[0];

  // Set everyone to be on the same team to start
  Employee.update({}, {
    team: data.team_id
  }, {
    multi: true
  }, function (error, numberAffected, response) {
    if (error) {
      console.error('Error updating employe team: ' + error);
    }

    console.info('Done updating employee teams');
    callback();
  });
};

async.series([
  deleteEmployees,
  deleteTeams,
  addEmployees,
  addTeams,
  updateEmployeeTeams
], function(error, results) {
  if (error) {
    console.error('Error: ' + error);
  }

  mongoose.connection.close();
  console.log('Done!');
});