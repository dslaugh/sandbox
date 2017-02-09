const express = require('express');

const app = express();
const users = ['John', 'Betty', 'Hal'];

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

module.exports = app;
