import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        createUser();
    };

    const createUser = async () => {
        try {
            let res = await createUserWithEmailAndPassword(
                auth,
                input.email,
                input.password
            );
            if (res) navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#eaeef1]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-[#014e4e]">
                    Create Account
                </h2>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#014e4e]"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        onChange={handleChange}
                        value={input.email}
                        id="email"
                        placeholder="name@example.com"
                        required
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-[#014e4e]"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={handleChange}
                        value={input.password}
                        id="password"
                        required
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-[#014e4e]"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        onChange={handleChange}
                        value={input.confirmPassword}
                        id="confirmPassword"
                        required
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-[#014e4e] hover:bg-[#016666] focus:ring-4 focus:outline-none focus:ring-[#7fc5c5] font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-[#014e4e] hover:underline cursor-pointer font-medium"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
