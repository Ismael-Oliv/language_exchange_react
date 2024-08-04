import { createContext, useCallback, useState, useContext, HTMLAttributes, useMemo } from "react";
import { api } from "../api";
import socketIo, { Socket } from "socket.io-client";
import { AuthContextInt, AuthData, UserDataLogin } from "./types";

type AuthProviderTypes = HTMLAttributes<Element>;

const AuthContext = createContext<AuthContextInt>({} as AuthContextInt);

export function AuthProvider({ children }: AuthProviderTypes) {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem("@language_exchange:Token");
    const user = localStorage.getItem("@language_exchange:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthData;
  });

  const socket = useMemo(() => {
    let token = localStorage.getItem("@language_exchange:Token");
    if (!token) {
      token = "";
    }

    return data.user
      ? socketIo("http://localhost:3001/chat", {
          reconnection: false,
          transports: ["websocket"],
          auth: {
            authorization: `Bearer ${token}`,
          },
        })
      : ({} as Socket);
  }, [data.user]);

  const signIn = useCallback(async ({ email, password }: UserDataLogin) => {
    const response = await api.post("/signin", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@language_exchange:Token", token);
    localStorage.setItem("@language_exchange:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@language_exchange:Token");
    localStorage.removeItem("@language_exchange:user");

    setData({} as AuthData);
    socket.active && socket.disconnect();
  }, [socket]);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut, socket }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextInt {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
