import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  signUp,
  confirmSignUp,
} from "aws-amplify/auth";

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

export function registerWithEmail(
  email,
  password,
  firstName,
  lastName
) {
  return signUp({
    username: email.trim(),
    password,
    options: {
      userAttributes: {
        email: email.trim(),
        given_name: firstName.trim(),
        family_name: lastName.trim(),
      },
      // The form explicitly signs in after confirmation.
      autoSignIn: false,
    },
  });
}

export function verifyEmail(email, code) {
  return confirmSignUp({
    username: email.trim(),
    confirmationCode: code.trim(),
  });
}