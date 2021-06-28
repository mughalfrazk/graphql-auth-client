import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      input: {
        name: $name
        username: $username
        email: $email
        password: $password
      }
    ) {
      id
      email
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        name
        email
        username
      }
      token
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(input: { token: $token }) {
      message
    }
  }
`;
