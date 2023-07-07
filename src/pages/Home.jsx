/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main";
import { useAppContext } from "../context/AppContext";
import Login from "./Login";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";

const Home = () => {
  const { isAuthenticated } = useAppContext();
  const [loading, setLoading] = useState(false); //Ye laoding task ke liye hai and context vali user ke liye
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const todoFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    await axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.allTasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`, null, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [refresh]);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={todoFormSubmitHandler}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {isAuthenticated ? (
          tasks.map((task) => {
            // console.log(task);
            return (
              <TodoItem
                key={task.id}
                task={task}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
              />
            );
          })
        ) : (
          <h3>Login to view your tasks</h3>
        )}
      </section>
    </div>
  );
};

export default Home;
