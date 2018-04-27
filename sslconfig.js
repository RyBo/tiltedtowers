const fs = require('fs');
const privateKey = fs.readFileSync('sslcert/server.key');
const certificate = fs.readFileSync('sslcert/server.crt');

module.exports = {
    credentials : {key: privateKey, cert: certificate};
}
