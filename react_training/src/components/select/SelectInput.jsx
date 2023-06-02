import React from "react";
import styles from "./SelectInput.module.scss";

function SelectInput({
  id,

  name,

  options,

  onChange,

  selectedValue,
}) {
  return (
    <div className={styles.div__input}>
      <select
        id={id}
        name={name}
        onChange={onChange}
        className={styles.div__select}
        value={selectedValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
