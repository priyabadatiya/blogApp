import React from "react";
import { profileURL } from "../utils/constant";

function ProfileBanner(props) {
  let { image, username, following } = props.user;
  const followUser = () => {
    props.setProfile({ ...props.user, following: true });
    fetch(`${profileURL}/${username}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${props.currentUser.token}`,
      },
      
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setProfile(data.profile);
        console.log(data);
      });
  };
  const unfollowUser = () => {
    props.setProfile({ ...props.user, following: false });
    fetch(`${profileURL}/${username}/follow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${props.currentUser.token}`,
      },
      // body: {},
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.setProfile(data.profile);
        console.log(data);
      });
  };
  console.log(props.user);
  return (
    <div className="text-center">
      <div className="text-center">
        <img
          alt="profile"
          className="mx-auto w-36 rounded-full border-green-700 border-double border-8 mb-4 mt-4"
          src={image || "/images/smiley.jpg"}
        />
      </div>
      <h1 className="text-2xl my-4">{username}</h1>
      <div className="mx-auto">
        {following ? (
          <button
            className="border-2 w-max p-2 rounded border-gray-700 border-solid"
            onClick={() => {
              unfollowUser();
            }}
          >
            ✔️ Following
          </button>
        ) : (
          <button
            className="border-2 w-max p-2 rounded border-gray-700 border-solid"
            onClick={() => {
              followUser();
            }}
          >
            ➕ Follow <span>{username}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileBanner;