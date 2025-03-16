const ruta = require('express').Router();

const auth = require('./_auth');
const register = require('./_register');
const validate = require('./_validate');

ruta.post('/', auth);
ruta.post('/register', register);
ruta.post('/validate', validate);

module.exports = ruta;
