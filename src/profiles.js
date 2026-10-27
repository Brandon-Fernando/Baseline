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