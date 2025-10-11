import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ShoeList from "./pages/ShoeList";
import AddShoe from "./pages/AddShoe";
import EditShoe from "./pages/EditShoe";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    });
    return () => unsubscribe();
  }, []);

  

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} Component={ShoeList} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/add" element={<PrivateRoute Component={AddShoe} isLoggedIn={isLoggedIn} />} />
        <Route path="/edit/:id" element={<PrivateRoute Component={EditShoe} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
