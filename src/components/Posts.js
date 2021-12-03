import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
function Posts(props) {
  console.log(props);
  if (!props.articles) return <Loader />;
  const { articles } = props;
  return articles.map((article) => (
    <div>
      <div>
        <div className="flex justify-between bg-gray-100 p-4 my-2  rounded-sm">
          <div className="col-1">
            <div className="flex my-2">
              <span className="image">
                <img src={article.author.image} alt="" />
              </span>
              <div className="mx-2">
                <Link to="/">
                  <h3> {article.author.username}</h3>
                </Link>
                <Link to="">
                  <time>{article.createdAt}</time>
                </Link>
              </div>
            </div>
            <Link to={`/article/${article.slug}`}>
              <h1 className="text-green-500 capitalize text-xl">
                {article.title}
              </h1>
            </Link>
            <Link to={`/article/${article.slug}`}>
              <p>{article.description.slice(0, 150) + "..."}</p>
            </Link>
            <Link
              to={`/article/${article.slug}`}
              className="bg-green-400 p-2 my-2 inline-block"
            >
              Read More
            </Link>
          </div>
          <div className="like-btn">
            <span>&hearts;</span>
            <span>{article.favoritesCount}</span>
          </div>
        </div>
      </div>
    </div>
  ));
}

export default Posts;