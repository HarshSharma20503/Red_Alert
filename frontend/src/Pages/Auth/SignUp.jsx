import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/signUp", formData);
      console.log(data);
      toast.success("Verify Your Email and than proceed to login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container h-100 d-flex justify-content-center align-content-center">
        <form className="d-flex flex-column justify-content-center align-content-center">
          <h3 className="text-white w-100 text-center">Sign In</h3>
          <div className="mb-3">
            <label className="text-white mb-2">Full name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="First name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
