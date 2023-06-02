import React from "react";
import styles from "./InputFields.module.scss";

function InputFields(props) {
  const { name, placeholder, type, onChange, value, errorMessage, className } =
    props;

  return (
    <div className={styles.div__input}>
      <input
        type={type}
        name={name}
        className={`${styles.form__input} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <small className={styles.error__text}>{errorMessage}</small>
    </div>
  );
}

export default InputFields;
