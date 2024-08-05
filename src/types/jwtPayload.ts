export type JwtPayload = {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
};
