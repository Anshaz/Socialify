const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();


admin.initializeApp();

var config = {
    apiKey: "AIzaSyBYNy_75HOLfshUMG6RJY0wVH-Roi34Lmo",
    authDomain: "socialify-2e968.firebaseapp.com",
    databaseURL: "https://socialify-2e968.firebaseio.com",
    projectId: "socialify-2e968",
    storageBucket: "socialify-2e968.appspot.com",
    messagingSenderId: "1036685278318",
    appId: "1:1036685278318:web:cdbf6b67960c5814ccba7f",
    measurementId: "G-VJ5P4R68HF"
};

const firebase = require('firebase');
firebase.initializeApp(config);


app.get('/screams', (req, res) => {

    admin.firestore()
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({

                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt

                });
            });

            return res.json(screams);
        })

        .catch(err => console.error(err));

});

app.post('/scream',(req, res) => {
    const newScream = {

        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()

    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {

            res.json({ message: `document ${doc.id} created successfully` });
        })
        .catch(err => {

            res.status(500).json({ error: 'something went wrong' });
            console.error(err);

        });

});

//signup route

app.post('/signup', (req, res) => {

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    //TODO Data validation

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
            return res
                .status(201)
                .json({ message: `user ${data.user.uid} signed up successfully` });

        })
        .catch((err) => {

            console.error(err);
            return res.status(500).json({ error: err.code });

        });
});

exports.api = functions.region('europe-west1').https.onRequest(app);