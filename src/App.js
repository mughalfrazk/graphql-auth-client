import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import Dashboard from "./Components/Dashboard";
import Auth from "./Components/Auth";
import VerifyEmail from "./Components/VerfiyEmail";
import "./App.css";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const auth = useAuth();

  let routes;
  if (auth.token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/verify">
          <VerifyEmail />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={auth}>
        <div className="App">
          <div className="App-header">
            <div className="col-md-6">
              <div className="card shadow px-3 pb-3 pt-4 text-dark">
                <Router>{routes}</Router>
              </div>
            </div>
          </div>
        </div>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
