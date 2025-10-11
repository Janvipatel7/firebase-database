import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const EditShoe = () => {
    const [input, setInput] = useState({ name: "", price: "", brand: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDoc(doc(db, "shoes", id));
            if (data.exists()) {
                setInput(data.data());
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (input.name.trim() === "") {
            validationErrors.name = "Please enter shoe name!";
        }
        if (input.price.trim() === "" || isNaN(input.price) || Number(input.price) <= 0) {
            validationErrors.price = "Please enter a valid price!";
        }
        if (input.brand.trim() === "") {
            validationErrors.brand = "Please enter brand name!";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the validation errors!");
            return;
        }

        try {
            await updateDoc(doc(db, "shoes", id), input);
            toast.success("Shoe updated successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Error updating shoe: " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#eaeef1]">
            <form onSubmit={handleUpdate}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#014e4e]">
                    Edit Shoe
                </h2>

                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#014e4e]">
                        Shoe Name
                    </label>
                    <input type="text" id="name" value={input.name} onChange={handleChange}
                        placeholder="Enter shoe name"
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200"/>
                    {errors?.name && <p className="text-red-500 text-xs">{errors?.name}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-[#014e4e]">
                        Price
                    </label>
                    <input type="number" id="price" value={input.price} onChange={handleChange}
                        placeholder="Enter price"
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200"/>
                    {errors?.price && <p className="text-red-500 text-xs">{errors?.price}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="brand" className="block mb-2 text-sm font-medium text-[#014e4e]">
                        Brand
                    </label>
                    <input type="text" id="brand" value={input.brand} onChange={handleChange}
                        placeholder="Enter brand name"
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#014e4e] focus:border-[#014e4e] block w-full p-2.5 transition duration-200"/>
                    {errors?.brand && <p className="text-red-500 text-xs">{errors?.brand}</p>}
                </div>

                <button type="submit"
                    className="w-full text-white bg-[#014e4e] hover:bg-[#016666] focus:ring-4 focus:outline-none focus:ring-[#7fc5c5] font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-200">
                    Update Shoe
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Go back to{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-[#014e4e] hover:underline cursor-pointer font-medium">
                        List Page
                    </span>
                </p>
            </form>
        </div>
    );
};

export default EditShoe;
