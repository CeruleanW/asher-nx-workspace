export type UserJWT = {
  displayName: string;
  email: string;
  picture: string;
};

export type JWT = {
  exp: number; // NumericDate
  iat: number;
  provider: "google"; // TODO Add more providers
  thirdPartyId: string;
  user: UserJWT;
};