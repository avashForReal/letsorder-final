import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { backendURL } from "../../constants";
import "./Login.css";
import AuthAPI from "../../AuthAPI";
import Cookies from "js-cookie";

async function loginUser(credentials) {
  return fetch(`${backendURL}/server/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

 
export default function Login() {

  const Auth = useContext(AuthAPI);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    const resData = await loginUser({
      email,
      password
    });
    // console.log(resData.data.token);
  //  setToken(resData.token);
 
    Auth.setAuth(true);
    Cookies.set("token", resData.token);
  }



  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input
            type="text"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
