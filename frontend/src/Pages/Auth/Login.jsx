import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", formData);
      // console.log(data);
      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Login Successfull");
      navigate("/");
    } catch (err) {
      // console.log(err);
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container h-75 d-flex justify-content-center align-content-center">
        <form className="d-flex flex-column justify-content-center align-content-center">
          <h3 className="text-white w-100 text-center">Log In</h3>
          <div className="mb-3">
            <label className="text-white mb-2">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="d-grid">
            {loading && (
              <div className="w-100 text-center py-3">
                <Spinner className="" animation="border" variant="primary" />
              </div>
            )}

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
