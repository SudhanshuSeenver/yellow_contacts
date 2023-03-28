import React from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./Flag.module.css";

function Flag({ code }) {
  return (
    <div className={styles.flags}>
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{
          width: "2rem",
        }}
        title={code}
      />
    </div>
  );
}

export default Flag;
