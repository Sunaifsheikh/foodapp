const firebaseConfig = {
    apiKey: "AIzaSyD3sPG_tMt1XXnYmmHwTW5zZgJ6_Kf58u8",
    authDomain: "food-delivery-app-54a09.firebaseapp.com",
    projectId: "food-delivery-app-54a09",
    storageBucket: "food-delivery-app-54a09.appspot.com",
    messagingSenderId: "310519288143",
    appId: "1:310519288143:web:5543d66ac6d9c851a6753a",
    measurementId: "G-61Q33ZH2D6"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


let url = window.location.href.split('=')[1];
var docRef = db.collection("restaurants").doc(url);
docRef.get().then((doc) => {
    if (doc.exists) {
        document.write(`<h1>Name of Restaurant: ${doc.data().name}</h1>`);
    } else {
        // doc.data() will be undefined in this case
        document.write("<h1>No such restaurant</h1>");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});