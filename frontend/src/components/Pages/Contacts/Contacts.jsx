// import Button from "../../Button/Button";
import ContactCard from "../../ContactCard/ContactCard";
import styles from "./Contacts.module.css";
// import { BsPersonFillAdd } from "react-icons/bs";
import ContactsContext from "../../../context/contactsContextA";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiEndPoint } from "../../../config";
import axios from "axios";

function Contacts({ ...props }) {
  const { user, setUser } = useContext(ContactsContext);

  const navigate = useNavigate();
  console.log(user);
  const list = [
    { name: "Bobad Marley", country_code: "1", phone_number: "9521024563" },
    { name: "Bob Marley", country_code: "91", phone_number: "9521024563" },
    { name: "Bob Marley", country_code: "91", phone_number: "9521024563" },
    { name: "Bob Marley", country_code: "91", phone_number: "9521024563" },
    { name: "Bob Marley", country_code: "91", phone_number: "9521024563" },
  ];

  async function getUser(token) {
    try {
      const userData = await axios.get(`${apiEndPoint}/user/getUser`, {
        headers: {
          token: token.access.token,
        },
      });
      console.log(userData.data);
      setUser({
        name: userData.data.name,
        id: userData.data.id,
        contacts: userData.data.contacts,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(user, "userrrrrUseEffect1");
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      navigate("/login");
      // return;
    }
    if (Object.keys(user).length === 0) {
      getUser(token);
    }
    // setUser({ ...user, contacts: [...list] });
    console.log(user, "userrrrrUseEffect2");
  }, []);

  console.log("user.id", Object.keys(user).length);

  return (
    <div className={styles.contactBox}>
      {/* <Button primary className={styles.addContact}>
        <BsPersonFillAdd />
        <p>Add Contact</p>
      </Button> */}
      {user.id && (
        <>
          <div className="user_dsc">
            <h2 className={styles.headingName}>
              <span>Hey</span> {user.name.split(" ")[0]}
            </h2>
            <h3 className={styles.heading3}>
              Here are your <span>contacts</span>
            </h3>
          </div>
          <div className={styles.userContacts}>
            {user.contacts.map((contact, i) => {
              return <ContactCard key={contact._id} contact={contact} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Contacts;
