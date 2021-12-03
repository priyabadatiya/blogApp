import React from "react";
import { ROOT_URL } from "../utils/constant";

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    fetch(ROOT_URL + `/articles/${this.props.slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          ...this.state,
        },
      }),
    }).then((res) => {
      this.props.fetchComment();
      this.setState({
        body: "",
      });
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      body: e.target.value,
    });
  };

  render() {
    console.log(this.props.user);
    return (
      <div className="container">
        <div className="comments">
          <h4 className="py-2 text-green-500">Add Comment:</h4>
          <form onSubmit={this.submitHandler}>
            <input
              className=" border-2 border-green-700 w-8/12 h-12"
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.onChangeHandler}
            />
            <input
              type="submit"
              className="mt-4 ml-6 w-1/12 h-12 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default PostComment;