const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

let keys;
if(process.env.NODE_ENV === 'development') {
    keys = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
} else {
    // in production, use a predefined pair of public/private keys!
    keys = {
        publicKey: fs.readFileSync(process.env.AUTH_PUBLIC_KEY_PATH),
        privateKey: fs.readFileSync(process.env.AUTH_PRIVATE_KEY_PATH),
    }
}

const auth = {
    createToken: async function(username='username') {
        return jsonwebtoken.sign({ username }, keys.privateKey, { algorithm: 'RS256'});
    },
    verifyToken: async function(token) {
        return jsonwebtoken.verify(token, keys.publicKey);
    },
};

module.exports = auth;
