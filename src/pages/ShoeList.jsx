import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShoeList = () => {
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    displayShoes();
  }, []);

  const displayShoes = async () => {
    const shoeSnapshot = await getDocs(collection(db, "shoes"));
    try {
      let shoeData = shoeSnapshot.docs.map((shoe) => ({
        id: shoe.id,
        ...shoe.data(),
      }));
      setShoes(shoeData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "shoes", id));
      displayShoes();
      toast.success("Shoe Deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeef1] py-10 px-5">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#014e4e] mb-3 sm:mb-0">
            Shoes List
          </h2>
          <button type="button" onClick={() => navigate("/add")}
            className="text-white bg-[#014e4e] hover:bg-[#016666] font-medium rounded-lg text-sm px-6 py-2 transition duration-200 shadow-md">
            + Add Shoe
          </button>
        </div>
        <div className="relative overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full text-sm text-left text-gray-600 border-collapse border border-gray-200">
            <thead className="text-xs uppercase bg-[#014e4e] text-white border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-center border border-gray-200">Name</th>
                <th scope="col" className="px-6 py-3 text-center border border-gray-200">Price</th>
                <th scope="col" className="px-6 py-3 text-center border border-gray-200">Brand</th>
                <th scope="col" className="px-6 py-3 text-center border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {shoes.length > 0 ? (
                shoes.map((shoe) => (
                  <tr key={shoe.id} className="bg-white hover:bg-[#f4f9f9] transition duration-150">
                    <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 border border-gray-200">
                      {shoe.name}
                    </th>
                    <td className="px-6 py-4 text-center border border-gray-200">{shoe.price}</td>
                    <td className="px-6 py-4 text-center border border-gray-200">{shoe.brand}</td>
                    <td className="px-6 py-4 text-center border border-gray-200">
                      <div className="flex justify-center gap-4">
                        <Link to={`/edit/${shoe.id}`} className="text-[#014e4e] font-semibold hover:underline">
                          <svg className="w-6 h-6 text-[#014e4e]"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                            />
                          </svg>
                        </Link>

                        <button onClick={() => handleDelete(shoe.id)} className="text-red-600 hover:underline font-semibold">
                          <svg
                            className="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center border border-gray-200 text-xl text-black font-semibold">
                    No shoes found. Add a new one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShoeList;
