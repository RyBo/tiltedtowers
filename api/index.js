//
const qs = require('qs');
const axios = require('axios');
const auth = require('../auth');

var authtoken = ['',''];

// Helper function for getting Spotify's auth token
exports.getAuth = function() {
   

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
                return resolve(token);
            })
            .catch((error) => {
                console.log(error);
                return reject(error);
            })  
    }); 
};

// Get playlists from spotify's API
exports.playlists = function(req, res) {

    exports.getAuth();
    const headers = {'Content-Type' : 'application/x-www-form-urlencoded','Authorization' : 'Bearer ' + authtoken[0] };

    axios.get('https://api.spotify.com/v1/users/rabidowl/playlists?limit=50', {headers: headers})
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
};

// Get tracks from selected playlist
exports.tracks = function(req, res) {

   exports.getAuth();

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
};


// Youtube API Access
exports.youtube = function(req, res) {

    const instrument = req.body.instrument;
    const artist = req.body.artist;
    const song = req.body.song;
    const searchParams = "search?q="+artist+" "+ song + " " + instrument + "+lesson+tutorial&part=snippet&maxResults=3&key=" + auth.youtube;

    axios.get('https://www.googleapis.com/youtube/v3/' + searchParams)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Spotify Search Feature
exports.spotifySearch = function(req, res) {

    exports.getAuth();
    const query = req.params.query;
    const searchParams = 'search?q='+query+'&type=playlist,album,artist&limit=3';

    axios.get('https://api.spotify.com/v1/' + searchParams)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

