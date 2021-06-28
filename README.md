# Getting Started with Graphql Authentication

This is the frontend of Graphql Authentication.
You need to run the backend project too for this project to work.
Follow the instruction on the backend repo to run the backend project.

You can find the backend repo on this link:
https://github.com/mughalfrazk/graphql-auth-server

About this project:
This is an apollo graphql authenticaiton server, following technologies are used in this project.

- Apollo Client
- Context API

## Available Scripts

### `npm install` to install the dependencies

and then

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The Application's Flow is like this.

1. The first screen you will se will be authentication screen.
   You can switch to Login and Signup by clicking on the "Signup Instead?" or "Login Instead?" text.

To create an account first open the singup screen fill out the form, on success an email will be sent to your written email for verification and you will bw moved to verify email page.
Copy the token from your email and paste the to the verify email page's textarea and click "verify email button".
Success message will be shown on success. and login button will appear below verify email.?

Click login button and you can login from you registered email and password.

If you try to login without email verification, you will again be redirected to verify email page and a new email will be sent to your email account.
So, to resend the email just login with unverified email and new token will be generated and sen to you email for verification, verification tokens are valid for 2 hours.
