import React from "react";
import styles from "./Button.module.scss";

function ButtonField(props) {
  const { buttonText, type, onClick, className, divClassName } = props;

  return (
    <div className={`${divClassName}`}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.btn__style} ${className}`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonField;
