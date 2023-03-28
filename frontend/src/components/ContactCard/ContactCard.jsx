import React, { useContext, useState } from "react";
import styles from "./ContactCard.module.css";
import countries from "i18n-iso-countries";
import Flag from "../Flag/Flag";
import { getCountryCode } from "../../helpers/countrycode";
import Button from "../Button/Button";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import InputField from "../InputField/InputField";
import Modal from "../Modal/Modal";
import { BsPersonFillAdd } from "react-icons/bs";
import ContactsContext from "../../context/contactsContextA";
import axios from "axios";
import { apiEndPoint } from "../../config";
console.log(getCountryCode("91"));
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
// console.log(countries);

function ContactCard({ contact, add, ...props }) {
  const countrycode = countries.numericToAlpha2("US");
  const [name, setName] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { user, setUser } = useContext(ContactsContext);
  console.log(contact);

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

  const inputFieldData = [
    { label: "Name", placeholder: "Enter Name", value: "name" },
    { label: "Country Code", placeholder: "", value: "country_code" },
    {
      label: "Number",
      placeholder: "",
      value: "phone_number",
    },
  ];

  async function deleteContacts(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return alert("unAuthorized");
    }
    if (!id) return;
    if (!token) return;
    try {
      // const data = { id: id };
      const config = {
        headers: {
          token: token.access.token,
        },
        data: {
          id,
        },
      };
      const userData = await axios.delete(
        `${apiEndPoint}/user/contacts/${user.id}`,
        config
      );
      console.log(userData);
      setUser({ ...user, contacts: userData.data.contacts });
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeleteId(e) {
    deleteContacts(contact._id);
  }

  async function updateContacts(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return alert("unAuthorized");
    }
    try {
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
      const data = {
        id: id,
        data: {
          name,
          country_code,
          phone_number,
        },
      };
      const config = {
        headers: {
          token: token.access.token,
        },
      };
      const userData = await axios.patch(
        `${apiEndPoint}/user/contacts/${user.id}`,
        data,
        config
      );
      setUser({ ...user, contacts: userData.data.contacts });
      setModalShow(false);
    } catch (err) {
      console.log(err);
    }
  }

  const states = { name, country_code, phone_number };
  console.log(states);

  function handleModalOpen(e) {
    setModalShow(true);
  }

  function handleModalClose(e) {
    setModalShow(false);
  }

  function handleUpdateContact(e) {
    updateContacts(contact._id);
  }
  // const panelClasses = styles.panel;
  // console.log(panelClasses, "2222222222222222222222222222222222");
  return (
    <div className={styles.contact}>
      {contact && (
        <>
          <Button
            onClick={handleModalOpen}
            secondary
            className={`${styles.btn_contact} ${styles.btn_edit} `}
          >
            <AiFillEdit />
          </Button>
          <Button
            secondary
            onClick={handleDeleteId}
            className={`${styles.btn_contact} ${styles.btn_del} `}
          >
            <AiFillDelete />
          </Button>
          <p className={styles.userName}>{contact.name}</p>
          <div className={styles.userPhone_num}>
            <div className={styles.country_code}>
              <Flag code={getCountryCode(contact.country_code).code} />
              <p>+{contact.country_code}</p>
            </div>
            <a className={styles.numlink} href={`tel:${contact.phone_number}`}>
              {contact.phone_number}
            </a>
          </div>
        </>
      )}
      {modalShow && (
        // <Modal panelClasses={styles.panel} closeModal={handleModalClose}>
        <Modal panelClasses={`${styles.panel}`} closeModal={handleModalClose}>
          <h1 className="">Update Contact</h1>
          {inputFieldData.map((field) => {
            return (
              <>
                <InputField
                  className={styles.inputF}
                  key={field.value}
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
          <div className={styles.modalAction}>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button primary onClick={handleUpdateContact}>
              Update
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ContactCard;
