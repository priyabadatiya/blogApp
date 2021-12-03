import React, { Component } from "react";
import Loader from "./Loader";
import { Link, withRouter } from "react-router-dom";
import { articlesURL } from "../utils/constant";
import CommentBox from "./CommentBox";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      error: "",
    };
  }

  fetchComment = () => {
    let slug = this.props.match.params.slug;

    fetch(articlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          article: data.article,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to fetch articles!",
        });
      });
  };

  componentDidMount() {
    this.fetchComment();
  }

  render() {
    console.log(this.props.user, "user");
    const { article, error } = this.state;
    console.log(article, "article");
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <div>
        <div className="container">
          <div className="head">
            <h1 className="text-red article-title font-serif mt-4">
              {article.title}
            </h1>
          </div>
          <div className="flex mt-6 pl-20">
            <div className="mr-6">
              <img
                src={article.author.image}
                alt=""
                className="image rounded-full border-8 border-green-600 border-double "
              />
            </div>
            <div>
              <Link to="/">
                <h3 className="capitalize text-gray-500 mb-1">
                  {" "}
                  {article.author.username}
                </h3>
              </Link>
              <Link to="">
                <time className="text-gray-600 text-sm">
                  {article.createdAt}
                </time>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center text-xl p-24 pt-8 leading-10 text-gray-800">
            {article.description}
          </p>
        </div>
        <div className="text-center">
          <CommentBox
            slug={this.props.match.params.slug}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SinglePost);