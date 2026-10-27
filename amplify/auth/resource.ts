import { defineAuth, referenceAuth } from '@aws-amplify/backend';

export const auth = referenceAuth({
  userPoolId: "us-east-2_wRwwDsdo6",
  userPoolClientId: "32t7pto0b7kess8jratgnoklun",
  identityPoolId: "us-east-2:09b80e0e-5606-42f7-ba85-b6054c0eb526",
  authRoleArn: "arn:aws:iam::975050053401:role/service-role/baseline-authenticated-role",
  unauthRoleArn: "arn:aws:iam::975050053401:role/service-role/baseline-unauthenticated-role",
});

