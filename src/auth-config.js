import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_RnmRAbjmS",
      userPoolClientId: "29tq5slr39um78s00phpb5k1bb",

      loginWith: {
        oauth: {
          // No https:// and no trailing slash:
          domain: "https://us-east-2p4fk8pesx.auth.us-east-2.amazoncognito.com",

          scopes: ["openid", "email", "profile"],

          redirectSignIn: ["http://localhost:5173/"],
          redirectSignOut: ["http://localhost:5173/"],

          responseType: "code",
        },
      },
    },
  },
});