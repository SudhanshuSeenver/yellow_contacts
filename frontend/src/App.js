import React from "react";
import Contacts from "./components/Pages/Contacts/Contacts";
import Footer from "./components/Footer/Footer";
import Login from "./components/Pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Pages/Register/Register";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  console.log("App");
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />

        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Contacts /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
