import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  token: null,
  id: null,
  username: null,
  name: null,
  email: null,
  login: () => {},
  logout: () => {},
});
