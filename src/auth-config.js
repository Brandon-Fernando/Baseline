// import { Amplify } from "aws-amplify";
// import { parseAmplifyConfig } from "aws-amplify/utils";
// import outputs from "../amplify_outputs.json";


// const backendConfig = parseAmplifyConfig(outputs);

// Amplify.configure({
//   API: backendConfig.API,

//   Auth: {
//     Cognito: {
//       userPoolId: "us-east-2_wRwwDsdo6",
//       userPoolClientId: "32t7pto0b7kess8jratgnoklun",

//       loginWith: {
//         oauth: {
//           // No https:// and no trailing slash:
//           domain: "us-east-2wrwwdsdo6.auth.us-east-2.amazoncognito.com",

//           scopes: ["openid", "email", "profile"],

//           redirectSignIn: ["http://localhost:5173/"],
//           redirectSignOut: ["http://localhost:5173/"],

//           responseType: "code",
//         },
//       },
//     },
//   },
// });
import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from "../amplify_outputs.json";

const backendConfig = parseAmplifyConfig(outputs);

Amplify.configure({
  ...backendConfig,

  Auth: {
    ...backendConfig.Auth,

    Cognito: {
      ...backendConfig.Auth.Cognito,

      loginWith: {
        ...backendConfig.Auth.Cognito.loginWith,

        oauth: {
          domain: "us-east-2wrwwdsdo6.auth.us-east-2.amazoncognito.com",

          scopes: ["openid", "email", "profile"],

          redirectSignIn: ["http://localhost:5173/"],
          redirectSignOut: ["http://localhost:5173/"],

          responseType: "code",
        },
      },
    },
  },
});

console.log(
  "Active Cognito configuration:",
  Amplify.getConfig().Auth?.Cognito
);