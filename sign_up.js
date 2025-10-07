// customer_auth.js (Consolidated from sign_up.js and adding login logic)
import { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  setDoc, 
  doc, 
  serverTimestamp 
} from "./firebase.js";

const authForm = document.getElementById("customerAuthForm");
const toggleSignUpBtn = document.getElementById("toggleSignUp");
const toggleSignInBtn = document.getElementById("toggleSignIn");
const authSubmitButton = document.getElementById("authSubmitButton");
const displayNameInput = document.getElementById("displayName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let isSignUpMode = true; // Default mode

function updateUIMode(isSignUp) {
    isSignUpMode = isSignUp;
    if (isSignUp) {
        // Sign Up Mode
        toggleSignUpBtn.classList.replace('bg-gray-700', 'bg-emerald-700');
        toggleSignUpBtn.classList.replace('text-gray-400', 'text-white');
        toggleSignInBtn.classList.replace('bg-emerald-700', 'bg-gray-700');
        toggleSignInBtn.classList.replace('text-white', 'text-gray-400');
        authSubmitButton.textContent = "Create Account";
        displayNameInput.required = true;
    } else {
        // Sign In Mode
        toggleSignInBtn.classList.replace('bg-gray-700', 'bg-emerald-700');
        toggleSignInBtn.classList.replace('text-gray-400', 'text-white');
        toggleSignUpBtn.classList.replace('bg-emerald-700', 'bg-gray-700');
        toggleSignUpBtn.classList.replace('text-white', 'text-gray-400');
        authSubmitButton.textContent = "Sign In";
        // Display name is not required for sign in, but we'll leave it visible for simplicity
        displayNameInput.required = false; 
    }
}

// Initial UI setup
updateUIMode(isSignUpMode);

toggleSignUpBtn.addEventListener('click', () => updateUIMode(true));
toggleSignInBtn.addEventListener('click', () => updateUIMode(false));

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const displayName = displayNameInput.value.trim();
  
  authSubmitButton.disabled = true;
  authSubmitButton.textContent = isSignUpMode ? "Creating..." : "Signing In...";

  try {
    if (isSignUpMode) {
        if (!displayName) {
             throw new Error("Display Name is required for sign up.");
        }
        // 1. Create a new user in Firebase Authentication
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        // 2. Save the user's details in Firestore (Required for staff role check)
        await setDoc(doc(db, "users", uid), {
          displayName,
          email,
          role: "customer", // IMPORTANT: Set role to customer
          createdAt: serverTimestamp(),
        });

        alert("Signup successful! Redirecting to your dashboard...");
    } else {
        // 1. Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
        alert("Sign in successful! Redirecting to your dashboard...");
    }

    // Redirect on success
    window.location.href = "dashboard_user.html"; 

  } catch (error) {
    let message = error.message;
    if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already in use. Try signing in.';
    } else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
    }
    alert("Authentication Error: " + message);
    console.error(error);
  } finally {
    authSubmitButton.disabled = false;
    authSubmitButton.textContent = isSignUpMode ? "Create Account" : "Sign In";
  }
});