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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // document.write("loggin in...")
        // setTimeout(() => {
        //     window.location.href = "login.html";
        // }, 1000);
        const user = firebase.auth().currentUser;
        const fName = document.getElementById("firstName").value;
        const lName = document.getElementById("lastName").value;
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;
        const number = document.getElementById("number").value;
        var status = document.getElementById("option").value;
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if (doc.data().status == "User")
                    window.location.href = "login.html";
                else
                    window.location.href = "admin.html";
            } else {
                db.collection("users").doc(user.uid).set({
                    email: user.email, fName, lName, city, country, number, status
                })
                    .then(() => {
                        alert("Account sucesfully created!");
                        if (status == "User")
                            window.location.href = "login.html";
                        else
                            window.location.href = "admin.html";
                    })
                    .catch((error) => {
                        alert("Error writing document: ", error);
                    });
            }
        })
    } else {
        document.body.style.display = "block";
    }
});
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

const signUp = () => {
    const email = document.getElementById("useremail").value;
    const password = document.getElementById("userpassword").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}
