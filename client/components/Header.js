import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout, me } from "../store/auth";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';

const Header = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(me);
  }, []);
  // let history = useHistory();
  const handleClick = () => {
    dispatch(logout());
    // history.push("/");
  };

  return (
    <div>
      <Navbar>
      <Container>
        {(user && user.id )? (
          <div id="nav-container-logged-in">
            <Link to="/">grounded</Link>
            <Link to="/products">All</Link>
            <Link to="/me">Me</Link>
            <Link to="/cart">Cart</Link>
            {user.isAdmin ? (
					<>
						<Link to="/users">All Users</Link>
					</>
				) : (
					<></>
				)}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div id="nav-container-logged-out">
            <Link to="/">Grounded</Link>
            <Link to="/products">All</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
        </Container>
      </Navbar>
      <hr />
    </div>
  );
};

export default Header;
