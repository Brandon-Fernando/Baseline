import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  signUp, 
  confirmSignUp
} from "aws-amplify/auth";

// Opens Cognito's login page, which includes a sign-up link.
export function login() {
  return signInWithRedirect();
}

export function loginWithGoogle() {
  return signInWithRedirect({ provider: "Google" });
}

export function logout() {
  return signOut();
}

export function getUser() {
  return getCurrentUser();
}

export function registerWithEmail(email, password) {
  return signUp({
    username: email,
    password,
    options: {
      userAttributes: { email },
    },
  });
}

export function verifyEmail(email, code) {
  return confirmSignUp({
    username: email,
    confirmationCode: code,
  });
}