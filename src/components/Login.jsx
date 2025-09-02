import axios from "axios";
import { useState, useEffect } from "react";
import { addUser } from "../../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        {
          email: Email,
          password: Password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
