import styles from "./CommonHero.module.css";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import Panel from "../Panel/Panel";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ContactsContext from "../../context/contactsContextA";

function CommonHero({ inputFieldData, type, states, inputChange, formAction }) {
  const { user, setUser } = useContext(ContactsContext);
  const navigate = useNavigate();

  async function handleClickSubmit(e) {
    const data = await formAction();

    if (!data) return;
    setUser({
      name: data.name,
      id: data.id,
      contacts: data.contacts,
    });
    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/contacts");
  }

  // console.log("user", user);
  return (
    <div className={styles.Com_container}>
      <div className={styles.hero_section}>
        <p className={styles.hero_slogan}>
          Keep your friends close - and your contacts book handy
        </p>

        <img
          className={styles.hero_img}
          src={require("../../assets/hero.png")}
          alt=""
        />
        <p className={styles.hero_ethos}>
          We want to help you save your contacts so you never lose them again.
          That's why our site is super simple to use and features a personalized
          search system
        </p>
      </div>
      <div className={styles.panel_logRgform}>
        <Panel>
          <h1 className={styles.Com_header}>{type.header}</h1>
          {inputFieldData.map((field) => {
            return (
              <>
                <InputField
                  key={field.value}
                  value={states[field.value]}
                  onChange={(e) => inputChange(field.value, e.target.value)}
                  className={styles.Com_input}
                  label={`${field.label}`}
                  placeholder={`${field.placeholder}`}
                />
              </>
            );
          })}
          {/* <InputField
                className="log_input"
                label="Name"
                placeholder="Enter your Name"
              />
              <InputField
                className="log_input"
                label="Email"
                placeholder="Enter your email"
              />
              <InputField
                className="log_input"
                label="Password"
                placeholder="Enter your Password"
              /> */}

          <Button onClick={handleClickSubmit} secondary className={styles.btn}>
            {type.btn}
          </Button>

          <div className={styles.signIn_Up_opts_box}>
            <p className={styles.signIn_Up_text}>Or Sign Up Using</p>
            <div className={styles.signIn_Up_opts}>
              <div className={`${styles.sIn_Up_option} ${styles.google}`}>
                <FaGoogle />
              </div>
              <div className={`${styles.sIn_Up_option} ${styles.twitter}`}>
                <FaTwitter />
              </div>
              <div className={`${styles.sIn_Up_option} ${styles.facebook}`}>
                <FaFacebook className={styles.facebook} />
              </div>
            </div>
          </div>

          {/* <div className="loginPg_actions">
              <Button primary className="btn_login">
              Register
              </Button>
              <Button secondary className="btn_login">
              Login
              </Button>
            </div> */}
        </Panel>
      </div>
    </div>
  );
}

export default CommonHero;
