import React from "react";
import { Link } from "react-router-dom";

function FeedNav(props) {
  return (
    <div className="feed_nav m-2">
      <ul className="flex space-between">
        <li onClick={props.removeTab}>
          <Link
            className={
              props.activeTab === "" &&
              "active_tab text-2xl uppercase font-medium my-4"
            }
            to="/"
          >
            Global Feed
          </Link>
        </li>
        {props.activeTab && (
          <li>
            <Link to="/" className={props.activeTab && "active_tab"}>
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default FeedNav;