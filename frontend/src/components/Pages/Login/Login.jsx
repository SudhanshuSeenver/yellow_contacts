// import Button from "../../Button/Button";
// import InputField from "../../InputField/InputField";
// import Panel from "../../Panel/Panel";
import "./login.css";
// import { FaGoogle } from "react-icons/fa";

import CommonHero from "../../CommonHeroSection/CommonHero";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndPoint } from "../../../config";

import ContactsContext from "../../../context/contactsContextA";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function onChangeInput(type, value) {
    if (type.toLowerCase() === "email") setEmail(value);
    else if (type.toLowerCase() === "password") setPassword(value);
    else throw new Error("Wrong type entered[ email, password]");
  }

  async function handleLogin() {
    try {
      if (email.length === 0) {
        return alert("Email is Required Field");
      } else if (password.length === 0) {
        return alert("Password is Required Field");
      }

      const data = { email, password };

      const userData = await axios.post(`${apiEndPoint}/auth/login`, data);
      console.log(userData);
      return userData.data;
    } catch (err) {
      console.log(err);
    }
  }

  const inputFieldData = [
    { label: "Email", placeholder: "Enter your Email", value: "email" },
    {
      label: "Password",
      placeholder: "Enter your Password",
      value: "password",
    },
  ];
  const pageType = {
    header: "Login",
    btn: "Login",
  };
  return (
    <CommonHero
      type={pageType}
      inputFieldData={inputFieldData}
      inputChange={onChangeInput}
      formAction={handleLogin}
      states={{ password, email }}
    />
  );
}

export default Login;
