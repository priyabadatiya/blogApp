import React from "react";
import { Link } from "react-router-dom";
import CommentsList from "./CommentsList";
import PostComment from "./PostComment";
import { ROOT_URL } from "../utils/constant";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      comments: [],
    };
  }

  fetchComment = () => {
    fetch(ROOT_URL + `/articles/${this.props.slug}/comments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot fetch data for specific comments");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          comments: data.comments,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to fetch comments!",
        });
      });
  };

  handleActive = (label) => {
    this.setState({ activeTab: label }, () => {
      this.fetchData();
    });
  };

  componentDidMount() {
    this.fetchComment();
  }

  render() {
    return (
      <div>
        {this.props.user === null ? (
          <p>
            <Link to="/login">Sign in </Link> or
            <Link to="/signup"> Sign up</Link> to add comments on this article
          </p>
        ) : (
          <PostComment
            slug={this.props.slug}
            user={this.props.user}
            fetchComment={this.fetchComment}
          />
        )}

        <CommentsList slug={this.props.slug} comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentBox;