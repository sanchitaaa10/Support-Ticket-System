import { 
  auth, 
  db, 
  addDoc, 
  collection, 
  serverTimestamp 
} from './firebase.js';

// This function handles submitting the ticket to Firestore
async function submitTicket(title, description, priority = 1) {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to submit a ticket!");
    return;
  }

  // 1️⃣ Add to global "tickets" collection
  const ticketRef = await addDoc(collection(db, "tickets"), {
    ownerUid: user.uid,
    ownerName: user.displayName || "",
    title,
    description,
    priority: Number(priority),
    status: "open",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  // 2️⃣ Add to user’s personal subcollection
  await addDoc(collection(db, "users", user.uid, "tickets"), {
    ticketId: ticketRef.id,
    title,
    description,
    priority: Number(priority),
    status: "open",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  alert("✅ Ticket submitted successfully!");
  // Optionally redirect to user dashboard
  // window.location.href = "dashboard_user.html";
}

// Listen to the ticket form submission
const ticketForm = document.getElementById("ticketForm");
if (ticketForm) {
  ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value || 1;

    if (!title || !description) {
      alert("Please fill out all fields!");
      return;
    }

    await submitTicket(title, description, priority);
    ticketForm.reset();
  });
}
