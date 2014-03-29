_ = require('underscore');
var dotenv = require('dotenv');
dotenv.load();

if (typeof process.env.port !== 'undefined') {
    process.env.PORT = process.env.port;
}

model = require('./models');
// databaseUrl = process.env.databaseUrl;
// mongo_collections = ['users'];
// mongojs = require('mongojs'); 
// db = mongojs(databaseUrl, mongo_collections);

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    express = require('express'),
    http = require('http'),
    api_router = require('./api_routes/api_router'),
    app = express(),
    server = http.createServer(app);

var appHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, api_token, user_token');
    res.header('X-Powered-By', 'MEAN');
    res.setHeader("Cache-Control", "public, max-age=345600"); // 4 days
    res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString());
    if ('OPTIONS' == req.method) {
        res.send(100);
    } else {
        next();
    }
};

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(appHeaders);
    app.use('/css', express.static(__dirname + '/www/css'));
    app.use('/img', express.static(__dirname + '/www/img'));
    app.use('/js', express.static(__dirname + '/www/js'));
    app.use('/views', express.static(__dirname + '/www/views'));
    app.use('/src', express.static(__dirname + '/src'));
    app.use('/downloads', express.static(__dirname + '/www/downloads'));
    if (process.env.ENVIRONMENT === 'dev') {
        app.use(express.logger('dev'));
    } 
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.set('views', __dirname + '/www');
    app.engine('html', require('ejs').renderFile);
});

//APP ROUTING
app.get('/', function (req, res) {
    if (typeof req.query._escaped_fragment_ !== 'undefined') {
        var childArgs = [
            path.join(__dirname, 'phantom.js'),
            req.protocol + '://' + req.headers.host + req.query._escaped_fragment_
        ];
        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            res.send(stdout);
        });
    } else {
        res.render('index.html');
    }
});

// Handle API routing up to 3 layers
app.all('/api/:route', api_router.route);
app.all('/api/:route/:sub_route', api_router.route);
app.all('/api/:route/:sub_route/:sub_sub_route', api_router.route);

// Handle other routing.
app.get('/*', function (req, res) {
    res.render('index.html');
});

// //SETTING UP SOCKETS
// socket = require('socket.io');
// io = socket.listen(server);
// redis = require('socket.io/node_modules/redis');
// io.set('store', new socket.RedisStore({
//     redisPub: redis.createClient(),
//     redisSub: redis.createClient(),
//     redisClient: redis.createClient()
// }));
// io.sockets.on('connection', function(socket) {});


//commenting out clusters for use with heroku
// SET UP APP WITH CLUSTERS
// if (cluster.isMaster) {
//     for (var i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster
//         .on('listening', function(worker, address) {
//             console.log('MEAN worker ' + worker.process.pid + ' listening on port ' + address.port);
//         })
//         .on('exit', function(worker, code, signal) {
//             console.log('worker ' + worker.process.pid + ' died');
//             cluster.fork();
//         });
//     db.users.find().limit(1, function (err, response) {
//         if (!err) {
//             console.log("Server connected to Mongo Database " + db._name + " using " + databaseUrl);
//         } else {
//             console.log('Could not connect to Mongo Database');
//         }
//     });
// } 

// if (cluster.isWorker) {
    server.listen(app.get('port'), function () {
        console.log('App listening on port ' + app.get('port'));
    });
// }

