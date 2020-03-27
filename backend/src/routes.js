const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.send('Hello World');
});

routes.post('/login', SessionController.login);

routes.get('/ong', OngController.listAll);
routes.post('/ong', OngController.create);

routes.get('/profile', ProfileController.listIncidentsForLoggedOng);

routes.get('/incident', IncidentController.list);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

module.exports = routes;
