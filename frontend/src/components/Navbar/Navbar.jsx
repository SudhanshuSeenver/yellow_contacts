import React, { useContext } from "react";
import Button from "../Button/Button";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { BsPersonFillAdd } from "react-icons/bs";
import { useState } from "react";
import Modal from "../Modal/Modal";
import InputField from "../InputField/InputField";
import ContactsContext from "../../context/contactsContextA";
import axios from "axios";
import { apiEndPoint } from "../../config";
import { getCountryCode } from "../../helpers/countrycode";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const { user, setUser } = useContext(ContactsContext);

  const navigate = useNavigate();

  function handleInputChange(type, value) {
    if (type === "name") setName(value);
    else if (type === "country_code") {
      if ((value.length >= 0 && Number(value)) || value === "")
        setCountryCode(value);
    } else if (type === "phone_number") {
      if ((value.length >= 0 && Number(value)) || value === "")
        setPhoneNumber(value);
    }
  }

  async function createContact() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      console.log("return");
      return;
    }
    try {
      // console.log(name.length, country_code.length, phone_number.length);
      if (
        name.length === 0 ||
        country_code.length === 0 ||
        phone_number.length === 0
      ) {
        alert("All fields are required");
        return;
      }

      if (!getCountryCode(country_code))
        return alert("please enter a valid country code");

      const data = { name, country_code, phone_number };
      const config = {
        headers: {
          token: token.access.token,
        },
      };
      const userData = await axios.post(
        `${apiEndPoint}/user/contacts/${user.id}`,
        data,
        config
      );
      setUser({ ...user, contacts: userData.data.contacts });
      setShowModal(false);
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }
  }

  function handleClickAdd(e) {
    createContact();
  }

  function handleClickLogout(e) {
    localStorage.clear();
    navigate("/login");
  }

  function handleOpenModal(e) {
    setShowModal(true);
  }
  function handleCloseModal(e) {
    setShowModal(false);
  }

  const inputFieldData = [
    { label: "Name", placeholder: "Enter Name", value: "name" },
    { label: "Country Code", placeholder: "", value: "country_code" },
    {
      label: "Number",
      placeholder: "",
      value: "phone_number",
    },
  ];

  const states = { name, country_code, phone_number };
  // console.log(states);

  const location = useLocation();
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={require("../../assets/logo5.png")} alt="logo" />
      </div>
      <div className="navbar_action">
        {location.pathname === "/contacts" ? (
          <>
            <Button onClick={handleOpenModal} secondary>
              <BsPersonFillAdd /> Add Contact
            </Button>

            <Button onClick={handleClickLogout} primary>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link className="nav_link" to="/login">
              <Button secondary>Login</Button>
            </Link>
            <Link className="nav_link" to="/">
              <Button primary>Register</Button>
            </Link>
          </>
        )}
      </div>
      {showModal && (
        <Modal panelClasses="NavbarComp panel" closeModal={handleCloseModal}>
          <h1 className="">Contact</h1>
          {inputFieldData.map((field) => {
            return (
              <>
                <InputField
                  key={field.value}
                  className="navbarAddContact input"
                  value={states[field.value]}
                  onChange={(e) =>
                    handleInputChange(field.value, e.target.value)
                  }
                  // className={styles.Com_input}
                  label={`${field.label}`}
                  placeholder={`${field.placeholder}`}
                />
              </>
            );
          })}
          <div className="ContactAdd_action">
            <Button onClick={handleCloseModal} secondary>
              Cancel
            </Button>
            <Button onClick={handleClickAdd} primary>
              Add
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Navbar;
