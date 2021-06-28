import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { CREATE_USER_MUTATION, LOGIN_MUTATION } from "../Graphql/Mutations";
import { useMutation } from "@apollo/client";

import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../shared/utils/validators";
import { isObjEmpty } from "../shared/utils/functions";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/Components/LoadingSpinner";
import Input from "../shared/Components/Input";

const Auth = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [loginState, setLoginState] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  const [loginInputErr, setLoginInputErr] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  const [createUser, { signupError }] = useMutation(CREATE_USER_MUTATION);
  const [login, { loginError }] = useMutation(LOGIN_MUTATION);

  const loginStateHandler = () => {
    setLoginState(!loginState);
    setLoginInput({
      email: "",
      password: "",
      username: "",
      name: "",
    });
    setErrorMsg("");
  };

  const setState = (event) => {
    if (event.target.id === "email") {
      setLoginInput({ ...loginInput, email: event.target.value });
      if (validate(event.target.value, [VALIDATOR_EMAIL()]))
        setLoginInputErr({
          ...loginInputErr,
          email: "",
        });
      else
        setLoginInputErr({
          ...loginInputErr,
          email: "Please write a valid email",
        });
    } else if (event.target.id === "password") {
      setLoginInput({ ...loginInput, password: event.target.value });
      if (validate(event.target.value, [VALIDATOR_MINLENGTH(8)]))
        setLoginInputErr({
          ...loginInputErr,
          password: "",
        });
      else
        setLoginInputErr({
          ...loginInputErr,
          password: "Password of min length 8 is required.",
        });
    } else if (event.target.id === "username") {
      setLoginInput({ ...loginInput, username: event.target.value });
      if (validate(event.target.value, [VALIDATOR_REQUIRE()]))
        setLoginInputErr({
          ...loginInputErr,
          username: "",
        });
      else
        setLoginInputErr({
          ...loginInputErr,
          username: "Username is required.",
        });
    } else {
      setLoginInput({ ...loginInput, name: event.target.value });
      if (validate(event.target.value, [VALIDATOR_REQUIRE()]))
        setLoginInputErr({
          ...loginInputErr,
          name: "",
        });
      else
        setLoginInputErr({
          ...loginInputErr,
          name: "Name is required.",
        });
    }
  };

  const loginSubmitHandler = async () => {
    if (loginInput.email === "" || loginInput.password === "") {
      setErrorMsg("Email and password is required.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    try {
      const data = await login({
        variables: {
          email: loginInput.email,
          password: loginInput.password,
        },
      });
      setResponseData(data);
      auth.login({
        id: data.data.login.user.id,
        token: data.data.login.token,
        name: data.data.login.user.name,
        email: data.data.login.user.email,
        username: data.data.login.user.username,
      });
      setIsLoading(false);
    } catch (err) {
      setErrorMsg(err.message);
      if (err.message === "Email not verified") {
        history.push("/verify");
      }
      setIsLoading(false);
    }
  };

  const signupSubmitHandler = async () => {
    if (!isObjEmpty(loginInput)) {
      setErrorMsg("Please fill out complete form.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    try {
      const data = await createUser({
        variables: {
          username: loginInput.username,
          name: loginInput.name,
          email: loginInput.email,
          password: loginInput.password,
        },
      });
      setResponseData(data);
      setIsLoading(false);
      history.push("/verify");
    } catch (err) {
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loginState ? (
        <div>
          <h5 className="text-secondary m-0">Login to your account</h5>

          {errorMsg && <h6 className="text-danger pt-2">{errorMsg}</h6>}
          <Input
            element="input"
            type="text"
            id="email"
            label="Email Address"
            value={loginInput.email}
            onChange={setState}
            error={loginInputErr.email}
          />
          <Input
            element="input"
            type="password"
            id="password"
            label="Password"
            value={loginInput.password}
            onChange={setState}
            error={loginInputErr.password}
          />
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={loginSubmitHandler}
          >
            {isLoading ? <LoadingSpinner xsmall color="white" /> : "Login"}
          </button>
        </div>
      ) : (
        <div>
          <h5 className="text-secondary m-0">Register Yourself</h5>
          {errorMsg && <h6 className="text-danger pt-2">{errorMsg}</h6>}
          <Input
            element="input"
            type="text"
            id="username"
            label="Username"
            value={loginInput.username}
            onChange={setState}
            error={loginInputErr.username}
          />
          <Input
            element="input"
            type="text"
            id="name"
            label="Full Name"
            value={loginInput.name}
            onChange={setState}
            error={loginInputErr.name}
          />
          <Input
            element="input"
            type="text"
            id="email"
            label="Email Address"
            value={loginInput.email}
            onChange={setState}
            error={loginInputErr.email}
          />
          <Input
            element="input"
            type="password"
            id="password"
            label="Password"
            value={loginInput.password}
            onChange={setState}
            error={loginInputErr.password}
          />
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={signupSubmitHandler}
          >
            {isLoading ? <LoadingSpinner xsmall color="white" /> : "Signup"}
          </button>
        </div>
      )}
      <div className="mt-3">
        <button className="btn p-0 px-3 fw-bold" onClick={loginStateHandler}>
          {loginState ? "Signup" : "Login"} Instead?
        </button>
      </div>
    </React.Fragment>
  );
};

export default Auth;
