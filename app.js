        var express      = require('express');
        var path         = require('path');
        var favicon      = require('serve-favicon');
        var logger       = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser   = require('body-parser');
        var routes       = require('./routes/index');
        var cons         = require('consolidate');
        var app          = express();
        var db           = require("./database/db");
        
        
        
        app.set('view engine', 'jade');
        
        
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, './public')));
        
        
        app.use('/', routes);
        
        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
        });
        
        app.all('/*', function(req, res, next) {
        
        res.header("Access-Control-Allow-Origin", req.headers.origin); 
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Cookie');
        if (req.method == 'OPTIONS') {
        res.status(200).end();
        } else {
        next();
        }
        });
        
        
        if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
        });
        }
        
        app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: {}
        });
        });
        
        var raw_port = process.env.PORT;
        
        process.argv.forEach(function(val, index, array) {
        var port_i = val.search(/^port=/i);
        if (port_i > -1) {
        raw_port = val.substring(port_i + 5, val.length);
        console.log("raw_port : " + raw_port);
        }
        });
        var port = normalizePort(raw_port || '4000');
        app.set('port', port);
        
        var server=app.listen(port, function () {
        console.log('Server listening on url: http://localhost:'+port);
        });
        
        
        
        function normalizePort(val) {
        var port = parseInt(val, 10);
        
        if (isNaN(port)) {
        // named pipe
        return val;
        }
        
        if (port >= 0) {
        // port number
        return port;
        }
        
        return false;
        }
        
        
        module.exports = app;
