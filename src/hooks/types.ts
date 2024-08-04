import { Socket } from "socket.io-client";

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  avatar_url: string;
  parking_space: ParkingSpace;
  created_at: Date;
}

export interface ParkingSpace {
  id: string;
  isAuthorized: Boolean;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextInt {
  user: User;
  signIn(creadentials: SignInCredentials): Promise<void>;
  signOut(): void;
  socket: Socket;
}


export type UserDataLogin {
  email:string,
  password:string
}