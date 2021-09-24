import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route,Redirect, Switch } from "react-router-dom";

import Canvas from "./components/Canvas/Canvas";
import Login from "./components/Login/Login";

// import useToken from "./components/App/useToken";
import AuthAPI from "./AuthAPI";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  // const { token, setToken } = useToken();
  // console.log( token, setToken )

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  // return (
  //   <div className="App">
  //     <Canvas />
  //   </div>
  // );

  const [auth, setAuth] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("token");
    if (user) {
      setAuth(true);
    }
  }

  useEffect(() => {
    readCookie();
  }, [])

  return (
    <div>
      <AuthAPI.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes />
        </Router>
      </AuthAPI.Provider>
    </div>
  );
}

const Routes = () => {
  const Auth = useContext(AuthAPI);
  return (
    <Switch>
      <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />
      <ProtectedRoute path="/orders" auth={Auth.auth} component={Canvas} />
    </Switch>
  );
};

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  return(
    <Route
    {...rest}   
    render={() => auth? (
      <Component />
    ):(
      <Redirect to="/login" />
    )}
    />
  )
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
  return(
    <Route
    {...rest}   
    render={() => !auth? (
      <Component />
    ):(
      <Redirect to="/orders" />
    )}
    />
  )
}

export default App;
