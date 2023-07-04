import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../main";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        setPassword("");
      } else {
        toast.error("Login failed.");
      }
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Register</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
