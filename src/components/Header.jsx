import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <nav className="bg-[#014e4e] shadow-md">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
                <span className="text-2xl font-bold text-white tracking-wide">
                    Shoe<span className="text-[#eaeef1]">Hub</span>
                </span>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-white text-sm font-medium hover:text-[#eaeef1] transition">
                        ShopList
                    </Link>

                    {isLoggedIn ? (
                        <button onClick={handleLogout}
                            className="px-5 py-2 rounded-full bg-white text-[#014e4e] hover:bg-[#eaeef1] font-medium text-sm transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate("/login")}
                            className="px-5 py-2 rounded-full bg-white text-[#014e4e] hover:bg-[#eaeef1] font-medium text-sm transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
