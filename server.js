const express = require('express')
    , routes = require('./routes')
    , api = require('./api')
    , user = require('./routes/user')
    , http = require('http') 
    , https = require('https') 
    , path = require('path');

const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./auth');
const sslconfig = require('./sslconfig');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host : auth.mysql_host,
    user : auth.mysql_user,
    password : auth.mysql_password,
    database : auth.mysql_database
});
connection.connect();
global.db = connection;

const app = express();
// Session Configuration
app.use(session({
    secret: 'chefpieter',
    resave: false,
    saveUninitialized: true,
    cookie : { maxAge: 6000}
}));

// ENV Configuration
//app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//app.get('/', routes.index);

var authtoken = ['',''];
api.getAuth();


// Load the REACT App after user logs in
app.get('/', (req, res) => {
    var user = req.session.user;
    userId = req.session.userId;

    if (userId == null) {
        res.redirect('/login')
        return;
    }
    res.sendFile(path.join(__dirname+'/client/build/app.html'));
});

// User routes
app.get('/login', routes.index);
app.get('/signup', user.signup);
app.get('/logout', user.logout);
app.post('/login', user.login);
app.post('/signup', user.signup);

// API routes
app.get('/api/spotify/playlists', api.playlists);
app.get('/api/spotify/users/:user/playlists/:playlist/tracks', api.tracks);
app.post('/api/youtube', api.youtube);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
//app.get('*', (req, res) => {

app.listen(5000);
//https.createServer(sslconfig.credentials, app).listen(5000);
console.log(`Backend API listening on port 5000`);
