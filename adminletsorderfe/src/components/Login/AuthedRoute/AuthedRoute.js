import React from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const GuardedRoute = ({ component: Component, authed, ...rest}) => {
  const history = useHistory();
  
  return (
    <Route {...rest}>{authed === true ? <Component /> : <div>Loading... {history.push("/")}</div>}</Route>
  );
  // return(
  //   <Route
  //   {...rest}   
  //   render={() => auth? (
  //     <Component />
  //   ):(
  //     <Redirect to="/" />
  //   )}
  //   />
  // )
  
};

GuardedRoute.propTypes = {
  component: PropTypes.object.isRequired,
  authed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authed: state.login.authed,
});

export default connect(mapStateToProps)(GuardedRoute);
