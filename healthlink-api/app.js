var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const medicoRoutes = require('./routes/medicos');
const turnoRoutes = require('./routes/turnos');
const pacienteRoutes = require('./routes/pacientes');
const cors = require('cors');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/medicos', medicoRoutes);
app.use('/turnos', turnoRoutes);
app.use('/pacientes', pacienteRoutes);

module.exports = app;



