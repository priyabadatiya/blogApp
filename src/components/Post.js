import React from "react";
import { Link } from "react-router-dom";

function Posts(props) {
  // console.log(props);
  return (
    <div>
      <div>
        <div className="flex justify-between bg-gray-100 p-4 my-2  rounded-sm">
          <div className="col-1">
            <div className="flex my-2">
              <span className="image">
                <Link to={`/profile/${props.author.username}`}>
                  <img src={props.author.image} alt="" />
                </Link>
              </span>
              <div className="mx-2">
                <Link to={`/profile/${props.author.username}`}>
                  <h3 className="font-bold"> {props.author.username}</h3>
                </Link>
                <Link to="">
                  <time>{props.createdAt}</time>
                </Link>
              </div>
            </div>
            <Link to={`/article/${props.slug}`}>
              <h1 className="text-green-600 capitalize text-xl">
                {props.title}
              </h1>
            </Link>
            <Link to={`/article/${props.slug}`}>
              <p>{props.description.slice(0, 150) + "..."}</p>
            </Link>
            <Link
              to={`/article/${props.slug}`}
              className="bg-green-700 hover:bg-green-600 text-white py-2 px-3 my-2 inline-block rounded-full"
            >
              Read More
            </Link>
          </div>
          <div className="like-btn rounded-sm	">
            <span>&hearts;</span>
            <span>{props.favoritesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;