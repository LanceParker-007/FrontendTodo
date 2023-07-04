import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../main";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
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
      setName("");
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 409)
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed.");
      }
      setName("");
      setEmail("");
      setPassword("");
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
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button disabled={loading} type="submit">
            Register
          </button>
          <h4>Or</h4>
          <Link to="/login">Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
