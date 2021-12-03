import React, { Component } from "react";
import "../styles/style.css";
import { updateUserURL } from "../utils/constant";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.currentUser.email,
      username: props.currentUser.username,
      password: "",
      image: props.currentUser.image,
      bio: props.currentUser.bio,
      errors: {
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("abc");
    const { username, email, password, image, bio } = this.state;
    const token = localStorage.getItem("app_user") || "";
    fetch(updateUserURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: { email, password, bio, image, username } }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ errors }) =>
            this.setState((prevState) => {
              return {
                ...prevState,
                errors: {
                  ...prevState.errors,
                  password: "Password cannot be empty",
                },
              };
            })
          );
          throw new Error("Update failed");
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

  handleChange = (name) => (e) => {
    let { value } = e.target;
    console.log(name, value);
    let { errors } = { ...this.state };

    switch (name) {
      case "password":
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
    return (
      <div className="container">
        <form className="form_control" onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="email"
            className="input_box"
            value={this.state.email}
            onChange={this.handleChange("email")}
            name="email"
          />
          <input
            type="text"
            placeholder="username"
            className="input_box"
            value={this.state.username}
            onChange={this.handleChange("username")}
            name="username"
            readOnly="true"
          />
          <input
            type="password"
            placeholder="password"
            className="input_box"
            value={this.state.password}
            name="password"
            onChange={this.handleChange("password")}
          />
          <input
            type="url"
            placeholder="Paste your image link"
            className="input_box"
            value={this.state.image}
            name="image"
            onChange={this.handleChange("image")}
          />
          <input
            type="text"
            placeholder="bio"
            className="input_box"
            value={this.state.bio}
            name="bio"
            onChange={this.handleChange("bio")}
          />
          <input type="submit" value="Update" className="input_box" />
        </form>
      </div>
    );
  }
}