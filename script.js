// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyB_dgNWQY52s6q7kyMiIfNY0mrOtMXFdrM",
    authDomain: "hgfj-717e1.firebaseapp.com",
    projectId: "hgfj-717e1",
    storageBucket: "hgfj-717e1.firebasestorage.app",
    messagingSenderId: "919473751207",
    appId: "1:919473751207:web:f852535fa58d2714a8c782"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// User Authentication
document.getElementById("login-btn").addEventListener("click", () => {
    const email = prompt("Enter Email:");
    const password = prompt("Enter Password:");
    auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            alert("Logged in as " + user.user.email);
            document.getElementById("logout-btn").style.display = "inline-block";
        })
        .catch(err => alert(err.message));
});

document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut()
        .then(() => {
            alert("Logged out");
            document.getElementById("logout-btn").style.display = "none";
        })
        .catch(err => alert(err.message));
});

// Search Functionality
document.getElementById("search-btn").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = "<p>Searching...</p>";
    
    const snapshot = await db.collection("profiles").get();
    const filtered = snapshot.docs.filter(doc => doc.data().description.toLowerCase().includes(query));
    
    results.innerHTML = filtered.length ? filtered.map(doc => `
        <div>
            <h3>${doc.data().name}</h3>
            <p>${doc.data().description}</p>
        </div>
    `).join("") : "<p>No results found</p>";
});
