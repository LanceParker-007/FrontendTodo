import { Loader } from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import Login from "../pages/Login";

const Profile = () => {
  const { isAuthenticated, loading, user } = useAppContext();

  if (!isAuthenticated) {
    return <h3 style={{ textAlign: "center" }}>Login to view your profile.</h3>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
