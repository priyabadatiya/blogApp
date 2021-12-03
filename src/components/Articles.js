import React from "react";
import { articlesURL } from "../utils/constant";
import Post from "./Post";
import Loader from "./Loader";
import Feednav from "./Feednav";

function Articles(props) {
  // console.log(props);

  if (props.error) {
    return <p>{props.error}</p>;
  }
  if (!props.data) {
    return <Loader />;
  }

  if (articlesURL.length < 1) {
    return <h2>No Articles Found!</h2>;
  }
  return (
    <div className="flex-60">
      <div>
        <Feednav activeTab={props.activeTab} removeTab={props.removeTab} />
      </div>
      <div>
        {props.data &&
          props.data.map((article) => {
            return <Post key={article.slug} {...article} />;
          })}
      </div>
    </div>
  );
}

export default Articles;