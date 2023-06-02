import React, { useState } from "react";
import ButtonField from "../../components/buttons/ButtonField";
import InputFields from "../../components/input/InputFields";
import { useNavigate } from "react-router-dom";
import styles from "./EmsLogin.module.scss";
import EmsService from "../../services/api/emsService";

function EmsLogin() {
  const [loginInput, setLoginInput] = useState({
    user_id: "",
    password: "",
  });
  const [loginErrorMsg, setLoginErrorMsg] = useState({});
  const navigate = useNavigate();
  let setFlag;

  const getApiService = new EmsService();

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    setLoginErrorMsg(validateInput(loginInput));

    if (setFlag) {
      getApiService
        .loginData({
          email: loginInput.user_id,
          password: loginInput.password,
        })
        .then((response) => {
          sessionStorage.setItem("accessToken", response.accessToken);
          sessionStorage.setItem("userName", loginInput.user_id);
          navigate("/addEmployee");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const validateInput = (loginInput) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^((?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,})+$/;

    if (!loginInput.user_id) {
      errors.user_id = "ENTER VALID EMAIL ADDRESS";
    } else if (!emailRegex.test(loginInput.user_id)) {
      errors.user_id = "ENTER VALID EMAIL ADDRESS";
    }

    if (!loginInput.password) {
      errors.password =
        "8-16 characters, special character, 1 uppercase, 1 lowercase, 1 number";
    } else if (!passwordRegex.test(loginInput.password)) {
      errors.password =
        "8-16 characters, special character, 1 uppercase, 1 lowercase, 1 number";
    }

    if (
      Object.keys(errors).length < 1 &&
      loginInput.user_id &&
      loginInput.password
    ) {
      setFlag = true;
    }
    return errors;
  };

  return (
    <div>
      <h2>WELCOME </h2>

      <div className={styles.container}>
        <InputFields
          type="text"
          name="user_id"
          placeholder="USER ID"
          onChange={handleInputChange}
          value={loginInput.user_id}
          errorMessage={loginErrorMsg && loginErrorMsg.user_id}
        />
        <InputFields
          type="password"
          name="password"
          placeholder="PASSWORD"
          onChange={handleInputChange}
          value={loginInput.password}
          errorMessage={loginErrorMsg && loginErrorMsg.password}
        />

        <ButtonField
          divClassName={`btnContainer`}
          type="button"
          buttonText="LOGIN"
          className="loginBtn"
          onClick={handleSubmitBtn}
        />
      </div>
    </div>
  );
}

export default EmsLogin;
