// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var port = process.env.PORT || 8080;

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// ROUTES
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {
  var dave = new User({
    name: 'David Slaugh',
    password: 'password',
    admin: true
  });

  dave.save(function(err) {
    if (err) {
      throw err;
    }

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// API ROUTES
var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name,
  }, function(err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password !== req.body.password) {
        res.json({success: false, message: 'Wrong password.'});
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});

// route to show a random message
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on Earth!' });
});

// route to show all users
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
