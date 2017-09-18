const CryptoJS = require('crypto-js');
const secret = "blahblahblah";

const encryptedPW = CryptoJS.AES.encrypt('Abcd1234!', secret);

const pwstring = encryptedPW.toString();

console.log(pwstring);
