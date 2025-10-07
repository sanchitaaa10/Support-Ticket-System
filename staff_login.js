import { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  doc, 
  getDoc, 
  signOut 
} from './firebase.js';

async function staffSignIn(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // Check if the signed-in user is a staff member
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists() || userDoc.data().role !== "staff") {
      await signOut(auth);
      alert("Access denied: not a staff account or role is incorrect.");
      return;
    }

    // ✅ Redirect to staff dashboard
    window.location.href = "staff_dashboard.html"; // Redirect to the actual dashboard file
  } catch (error) {
    // Improved error handling
    const errorMessage = error.code === 'auth/invalid-credential' ? 'Invalid email or password.' : error.message;
    alert("Login Failed: " + errorMessage);
    console.error("Staff Sign-in Error:", error);
  }
}

// Attach the sign-in function to the form submit event
const form = document.getElementById("staffLoginForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await staffSignIn(email, password);
  });
} else {
    console.error("Error: staffLoginForm not found. Check staff_login.html ID.");
}