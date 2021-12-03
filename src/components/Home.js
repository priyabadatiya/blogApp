import React, { Component } from "react";
import Hero from "./Hero";
import Articles from "./Articles";
import Tags from "./Tags";
import Pagination from "./Pagination";

import { articlesURL } from "../utils/constant";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      error: "",
      articlesCount: 0,
      articlesPerPage: 10,
      activePage: 1,
      activeTab: "",
    };
  }

  componentDidMount() {
    fetch(articlesURL + `/?limit=${this.state.articlesPerPage}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
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
  }

  componentDidUpdate(__prevProps, prevState) {
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePage - 1) * limit;
    const tag = this.state.activeTab;

    fetch(
      articlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
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

  updateCurrentPageIndex = (index) => {
    this.setState(
      {
        activePage: index,
      },
      this.fetchData
    );
  };

  removeTab = () => {
    this.setState({
      activeTab: "",
    });
  };

  addTab = (value) => {
    this.setState({ activeTab: value, activePage: 1 });
  };

  render() {
    const {
      articles,
      error,
      articlesPerPage,
      articlesCount,
      activePage,
      activeTab,
    } = this.state;

    return (
      <div>
        <Hero />

        <div className="flex-box container">
          <Articles
            data={articles}
            error={error}
            activeTab={activeTab}
            removeTab={this.removeTab}
          />
          <Tags addTab={this.addTab} />
        </div>
        <Pagination
          articlesCount={articlesCount}
          articlesPerPage={articlesPerPage}
          activePage={activePage}
          updateCurrentPageIndex={this.updateCurrentPageIndex}
        />
      </div>
    );
  }
}

export default Home;

