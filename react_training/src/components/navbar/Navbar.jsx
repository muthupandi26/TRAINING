import React from "react";
import styles from "./Navbar.module.scss";

function Navbar({ text }) {
  return (
    <div className={styles.navbar}>
      <h1>{text}</h1>
    </div>
  );
}

export default Navbar;
