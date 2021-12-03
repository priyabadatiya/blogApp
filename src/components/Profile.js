import React, { Component } from "react";

import ProfileBanner from "./ProfileBanner";

import Posts from "./Posts";

import Pagination from "./Pagination";

import { articlesURL, profileURL } from "../utils/constant";

import Loader from "./Loader";
import { withRouter } from "react-router";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      activeTab: "author",
      pageNo: 1,
      articles: [],
      articlesCount: 0,
    };
  }

  fetchData = () => {
    console.log(this.props);
    fetch(
      profileURL +
        `/${
          this.props.match.params?.username || this.props.currentUser.username
        }`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: this.props.currentUser
            ? `Token ${this.props.currentUser.token}`
            : undefined,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ profile: data.profile });
      });
    this.fetchPosts(1);
  };

  fetchPosts = (pageNo = 1) => {
    console.log(this.state);
    this.setState({
      pageNo,
      articles: [],
      articlesCount: 0,
    });

    fetch(
      articlesURL +
        `/?${this.state.activeTab}=${
          this.props.match.params?.username || this.props.currentUser.username
        }&limit=10&offset=${(pageNo - 1) * 10}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot fetch data for specific user");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Unable to fetch articles!",
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleActive = (label) => {
    this.setState({ activeTab: label }, () => {
      this.fetchPosts(1);
    });
  };

  render() {
    const { activeTab } = this.state;
    const { profile } = this.state;
    if (!profile) {
      return <Loader />;
    }

    return (
      <div className="container">
        <ProfileBanner
          user={profile}
          currentUser={this.props.currentUser}
          setProfile={(profile) => this.setState({ profile })}
        />
        <div className="mt-8 mb-4">
          <button
            className={`py-2 px-3  rounded-full mr-2 ${
              activeTab === "author" && "active"
            }`}
            onClick={() => this.handleActive("author")}
          >
            My Articles
          </button>
          <button
            className={`py-2 px-3 rounded-full ${
              activeTab === "favorited" && "active"
            }`}
            onClick={() => this.handleActive("favorited")}
          >
            Favorited Articles
          </button>
        </div>
        <Posts
          articles={
            this.state.articles
              ? this.state.articles
              : " No articles are here yet"
          }
        />
        {this.state.articles.length ? (
          <Pagination
            articlesCount={this.state.articlesCount}
            articlesPerPage={10}
            activePage={this.state.pageNo}
            updateCurrentPageIndex={(pageNo) => {
              this.fetchPosts(pageNo);
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Profile);