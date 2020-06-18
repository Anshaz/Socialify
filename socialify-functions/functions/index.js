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

const db = admin.firestore();

app.get('/screams', (req, res) => {

    db
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

    db
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

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.match(regEx))
        return true;
    else false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;

}


//signup route

app.post('/signup', (req, res) => {

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

   // Data validation

    let errors = {};

    if (isEmpty(newUser.email)) {
        errors.email = 'Email must not be empty'
    }
    else if (!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }
    if (isEmpty(newUser.password)) {
        errors.password = 'Password must not be empty'
    }
    if (newUser.password !== newUser.confirmPassword) {
        errors.confirmPassword= 'Password must match'
    }
    if (isEmpty(newUser.handle)) {
        errors.handle = 'Handle must not be empty';
    }
    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors);

    let token, userId;

    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'handle taken already' });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();

        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId

            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });

        })


        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already is use' });
            }
                else {
                return res.status(500).json({ error: err.code });
            }
        })
});


//Login Route

app.post('/login', (req, res) => {
    const user = {

        email: req.body.email,
        password: req.body.password

    };
    let errors = {};

    if (isEmpty(user.email)) {

        errors.email = 'Must not be empty';
    }
    if (isEmpty(user.password)) {

        errors.password = 'Must not be empty';
    }
    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return res.status(400).json({ general: 'Wrong credential, please try again' });
            }
            else {
                return res.status(500).json({ error: err.code });
            }
        })

})


exports.api = functions.region('europe-west1').https.onRequest(app);