const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()
const express = require ('express')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const app = express();

app.get('/screams', (req, res) => {
    admin.firestore().collection('screams').get()
    .then((data)=>{
        let screams= [];
        data.forEach(doc => {
            screams.push({
                screamId:doc.id,
                body:doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt:doc.data().createdAt
            })
        });
        return res.json(screams);
    })
    .catch(err=>console.error(err))
})

app.post('/scream',(req, res) => {
    const newScream = {
        body:req.body.body,
        userHandle:req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    }
    admin.firestore().collection('screams').add(newScream)
    .then((doc)=>{
       res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch(err => {
        res.status(500).json({error:"co za ciul"});
        console.log('createScream issue',err)
    })
});

exports.api = functions.https.onRequest(app);

// exports.getScreams = functions.https.onRequest((req, res) => {
//     admin.firestore().collection('screams').get()
//     .then((data)=>{
//         let screams= [];
//         data.forEach(doc => {
//             screams.push(doc.data())
//         });
//         return res.json(screams);
//     })
//     .catch(err=>console.error(err))
// });

  // exports.createScreams = functions.https.onRequest((req, res) => {
//     if(req.method !=='POST') {
//         return res.status(400).json({error:'tylko postowc mozno Pieronie'})
//     }