import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

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
            validationErrors.email = "Please enter your email!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
            validationErrors.email = "Please enter a valid email address!";
        }

        if (input.password.trim() === "") {
            validationErrors.password = "Please enter your password!";
        } else if (input.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters!";
        }


        if (input.confirmPassword.trim() === "") {
            validationErrors.confirmPassword = "Please confirm your password!";
        } else if (input.password !== input.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match!";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the validation errors!");
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                input.email,
                input.password
            );
            if (res) {
                toast.success("Account created successfully!");
                setInput({ email: "", password: "", confirmPassword: "" });
                setTimeout(() => navigate("/"), 1500);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#eaeef1]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#014e4e]">
                    Create Account
                </h2>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#014e4e]">
                        Your Email
                    </label>
                    <input type="email" id="email" value={input.email} onChange={handleChange} placeholder="name@example.com"
                        className={`bg-[#f8f9fa] border ${errors.email ? "border-red-500" : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#014e4e]">
                        Password
                    </label>
                    <input type="password" id="password" value={input.password} onChange={handleChange} placeholder="Enter password"
                        className={`bg-[#f8f9fa] border ${errors.password ? "border-red-500" : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-[#014e4e]">
                        Confirm Password
                    </label>
                    <input type="password" id="confirmPassword" value={input.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
                        className={`bg-[#f8f9fa] border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                            } text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200`}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                <button type="submit"
                    className="w-full text-white bg-[#014e4e] hover:bg-[#016666] focus:ring-4 focus:outline-none focus:ring-[#7fc5c5] font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-200">
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-[#014e4e] hover:underline cursor-pointer font-medium">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
