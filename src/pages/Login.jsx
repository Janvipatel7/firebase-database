import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (input.email.trim() === "") {
      validationErrors.email = "Please enter your email address!";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.email)) {
        validationErrors.email = "Please enter a valid email address!";
      }
    }

    if (input.password.trim() === "") {
      validationErrors.password = "Please enter your password!";
    } else if (input.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors!");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      if (user) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaeef1] px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#014e4e] mb-8">
          Login
        </h2>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#014e4e]">
            Email Address
          </label>
          <input type="email" id="email" value={input.email} onChange={handleChange} placeholder="name@example.com"
            className="w-full bg-[#eaeef1] border border-[#014e4e]/40 text-[#013838] text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] p-2.5 transition"
          />
          {errors?.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#014e4e]">
            Password
          </label>
          <input type="password" id="password" value={input.password} onChange={handleChange} placeholder="Enter your password"
            className="w-full bg-[#eaeef1] border border-[#014e4e]/40 text-[#013838] text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] p-2.5 transition"
          />
          {errors?.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button type="submit" className="w-full text-white bg-[#014e4e] hover:bg-[#013838] font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition">
            Login
          </button>
          <button type="button" onClick={() => navigate("/signup")}
            className="w-full text-[#014e4e] border border-[#014e4e] hover:bg-[#014e4e] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
