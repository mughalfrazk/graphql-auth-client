import { useEffect, useState } from "react";

export const useAuth = () => {
  const stored_data = JSON.parse(localStorage.getItem("graphql-auth-data"));

  const [token, setToken] = useState(!!stored_data?.token);
  const [Id, setId] = useState(!!stored_data?.id);
  const [name, setName] = useState(!!stored_data?.name);
  const [email, setEmail] = useState(!!stored_data?.email);
  const [username, setUsername] = useState(!!stored_data?.username);

  const login = (data) => {
    setId(data.id);
    setToken(data.token);
    setUsername(data.username);
    setEmail(data.email);
    setName(data.name);
    localStorage.setItem(
      "graphql-auth-data",
      JSON.stringify({
        token: data.token,
        id: data.id,
        name: data.name,
        email: data.email,
        username: data.username,
      })
    );
  };

  const logout = () => {
    setToken(null);
    setId(null);
    setUsername(null);
    setEmail(null);
    setName(null);
    localStorage.removeItem("graphql-auth-data");
  };

  useEffect(() => {
    if (!!stored_data) login(stored_data);
  }, []);

  return { token, Id, name, email, username, login, logout };
};
