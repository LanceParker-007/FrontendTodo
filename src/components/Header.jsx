/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useAppContext();

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully.");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error("Some error occured");
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button className="btn" onClick={logoutHandler} disabled={loading}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
