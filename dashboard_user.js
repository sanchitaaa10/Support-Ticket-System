// dashboard_user.js
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from './firebase.js';

const ticketsContainer = document.getElementById("ticketsContainer");

// When user is logged in, load their tickets
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location = "customer_login.html";  // redirect if not logged in
    return;
  }

  try {
    // Query tickets owned by the current user
    const ticketsQuery = query(
      collection(db, "tickets"),
      where("ownerUid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(ticketsQuery);

    ticketsContainer.innerHTML = ""; // clear any previous data

    if (snap.empty) {
      ticketsContainer.innerHTML = `<p class="text-gray-500 text-center">No tickets found.</p>`;
      return;
    }

    snap.forEach((doc) => {
      const ticket = doc.data();
      const card = `
        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <h3 class="text-lg font-bold text-pink-600">${ticket.title}</h3>
          <p class="text-gray-600 mt-1">${ticket.description}</p>
          <p class="text-sm text-gray-400 mt-2">Priority: ${ticket.priority}</p>
          <p class="text-sm text-gray-400">Status: ${ticket.status}</p>
        </div>
      `;
      ticketsContainer.innerHTML += card;
    });

  } catch (error) {
    console.error("Error loading tickets:", error);
    ticketsContainer.innerHTML = `<p class="text-red-600 text-center">Failed to load tickets.</p>`;
  }
});
