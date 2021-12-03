import React, { Component } from "react";
import { localStorageKey } from "../utils/constant";

class Logout extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.setUser(null);
    this.props.setIsLoggedIn(false);
    this.props.history.push("/");
    localStorage.removeItem(localStorageKey);
  }
  render() {
    return <div></div>;
  }
}

export default Logout;