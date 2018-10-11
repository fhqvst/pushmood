import React from "react";
import { auth } from "../../firebase";

const SignoutButton = () => (
  <button type="button" onClick={auth.signout}>
    Sign Out
  </button>
);

export default SignoutButton;
