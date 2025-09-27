// Your Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyDGTJtFqWov20YSEAjtj3nH6a3TikoWawY",
  authDomain: "support-ticket-system-e467d.firebaseapp.com",
  projectId: "support-ticket-system-e467d",
  storageBucket: "support-ticket-system-e467d.firebasestorage.app",
  messagingSenderId: "985794520033",
  appId: "1:985794520033:web:8c60c5a4941e34861268a0",
  measurementId: "G-4WX6VXQ1WT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const issue = document.getElementById("issue").value;
  const priority = document.getElementById("priority").value;

  try {
    await db.collection("Tickets").add({
      name: name,
      email: email,
      issue: issue,
      priority: priority,
      status: "Open",
      createdAt: new Date()
    });
    alert("Ticket submitted successfully!");
    document.getElementById("ticketForm").reset();
  } catch (error) {
    console.error("Error adding ticket: ", error);
  }
});
