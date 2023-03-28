import "./inputField.css";

import React from "react";

function InputField({ children, className, label, ...props }) {
  let type = "text";
  if (label.toLowerCase() === "password") type = "password";
  return (
    <div>
      <label className="input_label" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        name={label}
        id={label}
        className={`form_input ${className}`}
        {...props}
      />
    </div>
  );
}

export default InputField;
