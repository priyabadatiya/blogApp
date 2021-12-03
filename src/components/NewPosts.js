import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router-dom";

class NewPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: "",
      errors: {
        title: "",
        description: "",
        body: "",
        tags: "",
      },
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    // console.log("DSfds");
    // const { title, description, body, tags } = this.state;
    fetch(articlesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          ...this.state,
          tagList: this.state.tags.split(",").map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Can not create new article");
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article);
        this.setState({
          title: "",
          description: "",
          tagList: "",
          body: "",
        });
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };

  changeHandler = (e) => {
    let { name, value } = e.target;
    let errors = { ...this.state.errors };
    this.setState({
      [name]: value,
      errors,
    });
  };

  render() {
    const { title, description, markdown, tags } = this.state;
    return (
      <div className="container flex justify-center">
        <form
          className=" flex justify-center my-10"
          onSubmit={this.submitHandler}
        >
          <fieldset className=" ">
            <input
              className="block my-2 p-2"
              type="text"
              placeholder="Article Title"
              value={title}
              name="title"
              onChange={this.changeHandler}
            />
            <input
              className="block my-2 p-2"
              type="text"
              placeholder="What's this article is all about"
              value={description}
              name="description"
              onChange={this.changeHandler}
            />
            <textarea
              name="body"
              id=""
              cols="30"
              rows="10"
              onChange={this.changeHandler}
              placeholder="Write your article (In markdown format)"
              value={markdown}
              className="block my-2 p-2"
            ></textarea>
            <input
              className="block my-2 p-2"
              type="text"
              placeholder="Enter Tags"
              value={tags}
              name="tags"
              onChange={this.changeHandler}
            />
            <input
              className="block my-2 p-2"
              type="submit"
              value="Publish Article"
              onSubmit={this.submitHandler}
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(NewPosts);