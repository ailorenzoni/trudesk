var async = require('async'),
    _ = require('lodash'),
    winston = require('winston'),

    permissions = require('../permissions');

var apiController = {};

apiController.content = {};

apiController.index = function(req, res, next) {
    res.redirect('login');
};

apiController.users = {};
apiController.users.get = function(req, res, next) {
  var userModel = require('../models/user');
  userModel.findAll(function(err, items) {
      if (err) {
        winston.error("Error: " + err);
        return res.send(err);
      }

      return res.json(items);
  });
};

apiController.users.insert = function(req, res, next) {
    var data = req.body;
    var userModel = require('../models/user');

    userModel.insertUser(data, function(err, r) {
        if (err) {
          winston.warn("Error: " + err);
          return res.send(err);
        }

        return res.send(r);
    });
};

//Roles
apiController.roles = {};
apiController.roles.get = function(req, res, next) {
    var roles = permissions.roles;
    return res.json(roles);
};

module.exports = apiController;