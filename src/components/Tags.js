import React, { Component } from "react";
import Loader from "./Loader";
import { tagsURL } from "../utils/constant";

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log(res);

        return res.json();
      })
      .then((data) =>
        this.setState({
          data: data.tags.filter((tag) => tag),
        })
      )
      .catch((err) => {
        this.setState({
          error: "Unable to fetch tags!",
        });
      });
  }
  render() {
    if (!this.state.data) {
      return Loader;
    }
    return (
      <div className="flex-30 ">
        <h1 className="text-2xl uppercase font-medium my-4">Popular Tags</h1>
        <div>
          <div className="flex flex-wrap tags">
            {this.state.data &&
              this.state.data.map((tags) => {
                return (
                  <div
                    key={tags}
                    className="bg-green-300 text-sm py-1 px-2 rounded-md m-2"
                  >
                    <button onClick={() => this.props.addTab(tags)}>
                      {tags}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}