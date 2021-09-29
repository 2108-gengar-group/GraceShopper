import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { me } from "../store/auth";

const Me = () => {
  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me);
  }, []);

  return (
    <div className = "single-user-container">
      <img src={user.imageUrl} width="300" height="200"></img>
      <h3>
        <span>Name: </span>
        {user.username}
      </h3>
      <h3>
        <span>Email: </span> {user.email}
      </h3>
      <h3>Orders</h3>
    </div>
  );
};

export default Me;
