const express = require('express');
const path = require('path');
const https = require('https');
const axios = require('axios');
const qs = require('qs');
const moment = require('moment');
const bodyParser = require('body-parser');

const auth = require('./auth');

const app = express();

var authtoken = ['',''];
getAuth();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Helper function for getting Spotify's auth token
function getAuth() {
   
    var nowTime = new Date();
    var expireTime = authtoken[1];

    if (nowTime < expireTime) {
        return;
    } else {
        console.log("Spotify auth token expired, fetching a new one");
    }

    var expireTime = new Date();
    // API token lasts an hour, set expire time to one hour from now
    expireTime.setHours(expireTime.getHours()+1);

    var token = '';
    const headers = {'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : auth.spotify};

    const data = qs.stringify({'grant_type' : 'client_credentials'});

    return new Promise((resolve, reject) => { 
        axios.post('https://accounts.spotify.com/api/token', data, {headers: headers})
            .then((response) => {
                token = response.data['access_token'];
                authtoken[0] = token;
                authtoken[1] = expireTime;
                console.log(authtoken);
                return resolve(token);
            })
            .catch((error) => {
                console.log(error);
                return reject(error);
            })
    });
}   

// Get playlists from spotify's API
app.get('/api/spotify/playlists', (req, res) => {

    getAuth();

    const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + authtoken[0] };

    axios.get('https://api.spotify.com/v1/users/rabidowl/playlists', {headers: headers})
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
});

// Get tracks from selected playlist
app.get('/api/spotify/users/:user/playlists/:playlist/tracks', (req, res) => {

    getAuth();

    const user = req.params.user;
    const playlist = req.params.playlist; 

    const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + authtoken[0] };
    axios.get('https://api.spotify.com/v1/users/'+user+'/playlists/'+playlist+'/tracks', {headers: headers})
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
});

// Youtube API Access
app.post('/api/youtube', (req, res) => {

    const instrument = req.body.instrument;
    const artist = req.body.artist;
    const song = req.body.song;
    const searchParams = "search?q="+artist+" "+ song + " " + instrument + "lesson+tutorial+how to play&part=snippet&maxResults=3&key=" + auth.youtube;

    axios.get('https://www.googleapis.com/youtube/v3/' + searchParams)
        .then((response) => {
            res.json(response.data); 
        })
        .catch((error) => {
            console.log(error);
        });
});

// Spotify Search Feature
app.get('/api/spotify/search/:query', (req, res) => {

    const query = req.params.query;
    const searchParams = 'search?q='+query+'&type=playlist,album,artist&limit=3';
    
    axios.get('https://api.spotify.com/v1/' + searchParams)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Backend API listening on ${port}`);
