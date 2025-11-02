import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddShoe = () => {
  const [input, setInput] = useState({ name: "", price: "", brand: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.name.trim() || !input.price || !input.brand.trim()) {
      toast.error("Enter all details correctly!");
      setInput({ name: "", price: "", brand: "" });
      return;
    }

    try {
      await addDoc(collection(db, "shoes"), input);
      toast.success("Shoe added successfully!");
      setInput({ name: "", price: "", brand: "" });
      navigate("/");
    } catch (error) {
      toast.error("Error adding shoe: " + error.message);
      setInput({ name: "", price: "", brand: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#eaeef1] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md border border-gray-200"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#014e4e]">
          Add New Shoe
        </h2>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#014e4e]">
            Shoe Name
          </label>
          <input
            type="text"
            id="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Enter shoe name"
            className="w-full bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] p-2.5 transition duration-200"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-[#014e4e]">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={input.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] p-2.5 transition duration-200"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="brand" className="block mb-2 text-sm font-medium text-[#014e4e]">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            value={input.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            className="w-full bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] p-2.5 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-[#014e4e] hover:bg-[#016666] focus:ring-4 focus:outline-none focus:ring-[#7fc5c5] font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
        >
          Add Shoe
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Go back to{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#014e4e] hover:underline cursor-pointer font-medium"
          >
            List Page
          </span>
        </p>
      </form>
    </div>
  );
};

export default AddShoe;
