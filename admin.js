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
const db = firebase.firestore();
const storage = firebase.storage();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        var docRef = db.collection("users").doc(uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if (doc.data().status == "User")
                    location.href = "login.html";
                else {
                    document.body.style.display = "block";
                    greetUser(doc);
                    callResturant(doc);
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    } else {
        console.log("no user sign in");
    }
});


const greetUser = (doc) => {
    const greet = document.getElementById("greet");
    greet.innerText = doc.data().fName + " " + doc.data().lName;
}

const addRestaurant = () => {
    document.getElementById("addmessage").innerText = "adding your restaurant.....";
    const user = firebase.auth().currentUser;
    const restuarantName = document.getElementById("restuarantName").value;
    const file = document.getElementById("restaurantImage").files[0];
    storage.ref(`images/${user.uid}/${restuarantName}.png`).put(file)
        .then(() => {
            let imgUrl;
            storage.ref(`images/${user.uid}/${restuarantName}.png`).getDownloadURL().then(function (url) {
                imgUrl = url;
                db.collection("restaurants").doc().set({
                    name: restuarantName,
                    restaurantId: user.uid,
                    owner: user.email,
                    url: imgUrl
                }).then(() => {
                    // alert("Restaurant successfully added");
                    location.reload();
                })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
            )

        })

}
const callResturant = (doc) => {
    const docRef = db.collection("restaurants").where("restaurantId", "==", doc.id);
    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            showRestaurant(doc);
        });
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

const showRestaurant = (doc) => {
    const row = document.getElementsByClassName("row")[1];
    const col = document.createElement("div");
    col.setAttribute("class", "col");
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("style", "width:18rem");
    const img = document.createElement("img");
    img.setAttribute("src", doc.data().url);
    img.setAttribute("class", "card-img-top");
    card.appendChild(img);
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.innerText = doc.data().name;
    cardBody.appendChild(cardTitle);
    const cardLink = document.createElement("a");
    cardLink.setAttribute("class", "btn btn-primary");
    cardLink.setAttribute("href", `rest.html?id=${doc.id}`)
    cardLink.innerText = "Click Here";
    cardBody.appendChild(cardLink);
    card.appendChild(cardBody);
    cardTitle.setAttribute("class", "card-title")
    col.appendChild(card);
    row.appendChild(col);

}

const logout = () => {
    firebase.auth().signOut().then(() => {
        document.write("logging out..");
        setTimeout(() => {
            window.location.href = "foodapp.html";
        }, 1500);
    }).catch((error) => {
        // An error happened.
    });
}
