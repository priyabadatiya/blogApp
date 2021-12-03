import React from "react";

import "../styles/style.css";
import { loginURL } from "../utils/constant";

import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    let { errors } = { ...this.state };

    switch (name) {
      case "email":
        let emailError = !value.includes("@") ? "Email doesnot contain @" : "";
        errors.email = emailError;
        break;
      case "password":
        let passwordError;
        if (value.length < 7) {
          passwordError = "Password can't be less than 6 characters";
        }
        var re = /^(?=.*\d)(?=.*[A-Za-z\d])(?=.*[A-Za-z])/;

        if (!re.test(value)) {
          passwordError = "Password must contain a character and a number";
        }
        errors.password = passwordError;
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      errors: errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ errors }) =>
            this.setState((prevState) => {
              return {
                ...prevState,
                errors: {
                  ...prevState.errors,
                  email: "Email or Password is invalid",
                },
              };
            })
          );
          throw new Error("Login is not successful");
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ email: "", password: "" });
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="container">
        <h1 className="text-center mb-10 font-bold">Sign In</h1>
        <Link to="/register" className="text-center block text-green-300">
          Need an account
        </Link>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>
            <input
              type="email"
              placeholder="Email"
              className="mb-6 p-2"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <div>{errors.email}</div>

          <label>
            <input
              type="password"
              placeholder="Password"
              className="p-2"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <div>{errors.password}</div>

          <input
            className="bg-green-200 p-3 block rounded"
            value="Sign In"
            disabled={errors.email || errors.password}
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);