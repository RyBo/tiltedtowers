const express = require('express')
    , api = require('./api')
    , path = require('path');

const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./auth');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Get Spotify authtoken
api.getAuth();

// User routes
app.get('/', routes.index);
app.get('/app', routes.app);
app.get('/login', routes.index);
app.get('/signup', user.signup);
app.get('/logout', user.logout);
app.post('/login', user.login);
app.post('/signup', user.signup);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// API routes
app.get('/api/spotify/playlists', api.playlists, api.getAuth);
app.get('/api/spotify/users/:user/playlists/:playlist/tracks', api.tracks);
app.post('/api/youtube', api.youtube);

app.listen(5000);
//https.createServer(sslconfig.credentials, app).listen(5000);
console.log(`Backend API listening on port 5000`);
