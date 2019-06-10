const myconnection = require('express-myconnection');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');
const app = express();

//  Importing Routes
const customerRoutes = require('./routes/customer');

//  Settings 

app.set('port', process.env.PORT || '3000');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  Middleware => Funciones ejecutadas antes de las peticiones de los usuarios

app.use(morgan('dev'));
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    port: '3306',
    database: 'crud_nodejs_mysql'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//  Routes
app.use('/', customerRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});