import "./register.css";
// import Button from "../../Button/Button";
// import InputField from "../../InputField/InputField";
// import Panel from "../../Panel/Panel";
// import { FaGoogle } from "react-icons/fa";
import CommonHero from "../../CommonHeroSection/CommonHero";
import { useContext, useState } from "react";
import { apiEndPoint } from "../../../config";
import axios from "axios";
import ContactsContext from "../../../context/contactsContextA";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(ContactsContext);

  function onChangeInput(type, value) {
    if (type.toLowerCase() === "name") setName(value);
    else if (type.toLowerCase() === "email") setEmail(value);
    else if (type.toLowerCase() === "password") setPassword(value);
    else throw new Error("Wrong type entered[name, email, password]");

    console.log({ name, email, password });
  }

  async function handleRegister() {
    try {
      if (name.length < 3) {
        return alert("Name should be greater than eaual to 3");
      } else if (email.length === 0) {
        return alert("Email is Required Field");
      } else if (password.length === 0) {
        return alert("Password is Required Field");
      }
      const data = { name, email, password };

      const userData = await axios.post(`${apiEndPoint}/auth/register`, data);
      console.log(userData.data);

      // console.log("token", JSON.stringify(userData.data.token));

      return userData.data;
    } catch (err) {
      console.log(err);
    }
  }

  const inputFieldData = [
    { label: "Name", placeholder: "Enter your Name", value: "name" },
    { label: "Email", placeholder: "Enter your Email", value: "email" },
    {
      label: "Password",
      placeholder: "Enter your Password",
      value: "password",
    },
  ];
  const pageType = {
    header: "Register",
    btn: "Sign Up",
  };
  return (
    <>
      <CommonHero
        inputFieldData={inputFieldData}
        type={pageType}
        states={{ name, email, password }}
        formAction={handleRegister}
        inputChange={onChangeInput}
      />
    </>
  );
}

export default Register;
