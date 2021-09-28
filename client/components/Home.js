import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = () => {
  const user = useSelector((state) => state.auth);
  if (user && user.id) {
    return (
      <div>
        <h3>Welcome, {user.username}</h3>
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
      </div>
    );
  }
};

/**
 * CONTAINER
 */

export default Home;


