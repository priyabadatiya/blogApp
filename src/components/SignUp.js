import React from "react";
import { signupURL } from "../utils/constant";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    fetch(signupURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ error }) => {
            return Promise.reject(error);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: "", email: "", password: "" });
      })
      .catch((errors) => this.setState({ errors }));
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    let { errors } = { ...this.state };

    switch (name) {
      case "username":
        let usernameError =
          value.length < 7 ? "Username can't be less than 6 characters" : "";
        errors.username = usernameError;
        break;

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

  render() {
    const { username, email, password, errors } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mb-10 font-bold">Sign Up</h1>
        <Link to="login" className="text-center block text-green-300">
          Have an account
        </Link>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="mb-6 p-2"
              value={username}
              onChange={this.handleChange}
            />
          </label>
          <div>{errors.username}</div>

          <label>
            <input
              type="email"
              placeholder="Email"
              className=" mb-6 p-2"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
          </label>
          <div>{errors.email}</div>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-6 p-2"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <div>{errors.password}</div>

          <input
            className="bg-green-200 p-3 block rounded"
            value="Sign Up"
            disabled={errors.email || errors.password}
            type="submit"
          />
        </form>
      </div>
    );
  }
}

export default SignUp;