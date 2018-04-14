const express = require('express');
const path = require('path');
const https = require('https');
const axios = require('axios');
const qs = require('qs');
const moment = require('moment');

const auth = require('./auth');

const app = express();

getAuth();
var token;
var hour;
var authtoken = [];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Helper function for getting Spotify's auth token
function getAuth() {
    var token = '';
    const headers = {'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : auth.spotify};

    const data = qs.stringify({'grant_type' : 'client_credentials'});

    return new Promise((resolve, reject) => { 
        axios.post('https://accounts.spotify.com/api/token', data, {headers: headers})
        .then((response) => {
            token = response.data['access_token'];
            hour = moment().hour();
            authtoken[0] = token;
            authtoken[1] = hour;
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

    const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + authtoken[0] };

    axios.get('https://api.spotify.com/v1/users/rabidowl/playlists', {headers: headers})
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
});


app.get('/api/spotify/users/:user/playlists/:playlist/tracks', (req, res) => {
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

/*
    // Youtube API Access
app.get('/api/youtube', (req, res) => {

});
*/

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Backend API listening on ${port}`);
