const fs = require('fs');
const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

module.exports = {
    credentials : {key: privateKey, cert: certificate}
}
