const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => res.send('ss'));

module.exports = routes;
