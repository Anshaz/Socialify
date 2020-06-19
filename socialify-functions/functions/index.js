const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
const { getAllScreams, postOneScream } = require('./handlers/screams');

const { signup, login, uploadImage } = require('./handlers/users');

//users routes

app.get('/screams',getAllScreams );
app.post('/scream', FBAuth, postOneScream);
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);


exports.api = functions.region('europe-west1').https.onRequest(app);