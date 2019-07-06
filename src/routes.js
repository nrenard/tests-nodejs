const routes = require('express').Router();

const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.get('/dashboard', (req, res) => res.send('ss'));

module.exports = routes;
