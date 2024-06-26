import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
} from "firebase/auth";
import app from "./fire";
import { renderLoader } from "./utils";
import { getUserData } from "./db";

const auth = getAuth(app);

export const logout = () => signOut(auth);

export async function sendSignInLink(email: string) {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: window.location.href,
      handleCodeInApp: true,
    });
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem("emailForSignIn", email);
    // The link was successfully sent. Inform the user.
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

// https://developers.google.com/identity/gsi/web/guides/display-button?authuser=0#javascript
// https://developers.google.com/identity/gsi/web/tools/configurator?authuser=0
export function handleGoogleSignIn(idToken: string) {
  // Build Firebase credential with the Google ID token.
  const credential = GoogleAuthProvider.credential(idToken);
  // Sign in with credential from the Google user.
  signInWithCredential(auth, credential).catch(
    (err: { code: string; message: string }) => {
      console.warn("Failed to sign in with Google");
      console.warn({
        code: err.code,
        message: err.message,
        err,
      });
      // The credential that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    }
  );
}

interface UserDoc {
  uid: string;
  displayName: string | null;
  email: string | null;
  name: string | null;
  id: string | null;
}

type AuthCallback = (user: UserDoc | null) => void;

// https://firebase.google.com/docs/auth/web/email-link-auth
async function checkUrlForEmailLink(cb: AuthCallback) {
  // ENTRY POINT #4
  // Confirm the link is a sign-in with email link.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    renderLoader();
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem("emailForSignIn");
    // User opened the link on a different device.
    // Ask the user to provide the associated email again.
    while (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    try {
      // The client SDK will parse the code from the link for you.
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      // You can access the new user via result.user
      const { user } = result;
      const { uid, displayName } = user;
      const userDoc = await getUserData(uid);
      if (userDoc) {
        cb({
          ...userDoc,
          displayName,
          email,
        });
      } else {
        cb({
          id: null,
          name: null,
          uid,
          displayName,
          email,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

export function authCallback(cb: AuthCallback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = user;
      renderLoader();
      getUserData(user.uid)
        .then((userData) => {
          if (userData) {
            cb({
              ...userData,
              displayName,
              email,
            });
          } else {
            cb({
              id: null,
              name: null,
              uid,
              displayName,
              email,
            });
          }
        })
        .catch(console.warn);
    } else {
      cb(null);
    }
  });
}

export function initAuth(cb: AuthCallback) {
  authCallback(cb);
  checkUrlForEmailLink(cb).catch(console.warn);
}
