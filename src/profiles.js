import { generateClient } from "aws-amplify/data";
import {
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";

function checkErrors(errors) {
  if (errors?.length) {
    throw new Error(
      errors.map((error) => error.message).join(", ")
    );
  }
}

export async function saveUserProfile({ firstName, lastName }) {
  // Amplify.configure(...) must run before this function is called.
  const client = generateClient({ authMode: "userPool" });
  const model = client.models.AccountProfile;

  if (!model) {
    throw new Error(
      "AccountProfile is missing from the Amplify configuration. " +
        "Wait for the sandbox deployment to succeed, then restart " +
        "the frontend using the updated amplify_outputs.json."
    );
  }

  const { userId } = await getCurrentUser();
  const attributes = await fetchUserAttributes();

  const profile = {
    id: userId,
    firstName: firstName?.trim() || "",
    lastName: lastName?.trim() || "",
    email: attributes.email,
  };

  if (!profile.firstName || !profile.lastName) {
    throw new Error("First and last name are required.");
  }

  if (!profile.email) {
    throw new Error("Your account does not have an email address.");
  }

  const existing = await model.get({
    id: userId,
  });

  checkErrors(existing.errors);

  const result = existing.data
    ? await model.update(profile)
    : await model.create(profile);

  checkErrors(result.errors);

  if (!result.data) {
    throw new Error("Your profile could not be saved.");
  }

  return result.data;
}

// Replaces the current user's favorite teams with the supplied list.
// An empty array clears all favorites.
export async function saveFavoriteTeams(favoriteTeams) {
  // Ensure the input is an array of non-empty strings.
  if (
    !Array.isArray(favoriteTeams) ||
    favoriteTeams.some(
      (team) => typeof team !== "string" || !team.trim()
    )
  ) {
    throw new Error("Favorite teams must be a list of team IDs.");
  }

  // Trim whitespace and remove duplicate team IDs.
  const teams = [
    ...new Set(favoriteTeams.map((team) => team.trim())),
  ];

  // Connect using the signed-in user's authentication.
  const client = generateClient({ authMode: "userPool" });
  const model = client.models.AccountProfile;

  if (!model) {
    throw new Error(
      "AccountProfile is missing from the Amplify configuration."
    );
  }

  // Identify the user from their authenticated session.
  const { userId } = await getCurrentUser();

  // The profile must already have been created during registration.
  const existing = await model.get({ id: userId });

  checkErrors(existing.errors);

  if (!existing.data) {
    throw new Error(
      "Please complete your profile before choosing favorite teams."
    );
  }

  // Update only favorites, preserving the other profile fields.
  const result = await model.update({
    id: userId,
    favoriteTeams: teams,
  });

  checkErrors(result.errors);

  if (!result.data) {
    throw new Error("Your favorite teams could not be saved.");
  }

  return result.data;
}