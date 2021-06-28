import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../shared/Components/Input";
import { VERIFY_EMAIL } from "../Graphql/Mutations";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../shared/context/auth-context";
import LoadingSpinner from "../shared/Components/LoadingSpinner";

const VerifyEmail = () => {
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [verifyEmail, { signupError }] = useMutation(VERIFY_EMAIL);

  const submitTokenHandler = async () => {
    if (token === "") {
      setErrorMsg("Please write a token.");
      return;
    }
    setIsLoading(true);
    try {
      const data = await verifyEmail({
        variables: {
          token,
        },
      });
      console.log(data);
      setSuccessText(data.data.verifyEmail.message);
      setIsLoading(false);
      setToken("");
    } catch (err) {
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  console.log(successText);

  return (
    <React.Fragment>
      <h5 className="text-secondary">
        A verification email is sent to your email <br /> Please copy the token
        from there and paste it here to verify and login.
      </h5>
      {successText && <h4 className="text-success">{successText}</h4>}
      <Input
        element="textarea"
        rows="5"
        label="Secret Token"
        value={token}
        onChange={(event) => setToken(event.target.value)}
      />

      <button className="btn btn-primary" onClick={submitTokenHandler}>
        {isLoading ? <LoadingSpinner xsmall color="white" /> : "Verify Email"}
      </button>
      {successText && <Link to="/auth">Login</Link>}
    </React.Fragment>
  );
};

export default VerifyEmail;
