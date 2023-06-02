import React, { useEffect, useState } from "react";
import ButtonField from "../../components/buttons/ButtonField";
import InputFields from "../../components/input/InputFields";
import SelectInput from "../../components/select/SelectInput";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AddEmployee.module.scss";

import Modal from "../../components/modal/Modal";
import EmsService from "../../services/api/emsService";

function AddEmployee() {
  const getApiService = new EmsService();
  const location = useLocation();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNo: "",
    domain: "",
  });
  const [submitErrorMsg, setSubmitErrorMsg] = useState({});
  const dropDownList = [
    { label: "Selected Option", value: 1 },
    { label: "Testing", value: 2 },
    { label: "Development", value: 3 },
    { label: "Operations", value: 4 },
    { label: "Account", value: 5 },
  ];

  let accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (location.state) {
      getApiService
        .getSingleEmployeeData(location.state.value._id, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) =>
          setEmployeeInfo({
            ...employeeInfo,
            firstName: response.firstName,
            lastName: response.lastName,
            emailId: response.email,
            phoneNo: response.phoneNo,
            domain: response.domain,
            _id: response._id,
          })
        )
        .catch((err) => console.log(err));
      setEdit(true);
    }
    if (!accessToken) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo({ ...employeeInfo, [name]: value });
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    setSubmitErrorMsg(validateInput(employeeInfo));
  };

  const handleDiscardBtn = () => {
    setEmployeeInfo({
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNo: "",
      domain: "",
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modalConfirmBtn = () => {
    if (edit) {
      getApiService
        .updateEmployeeData(
          employeeInfo._id,
          {
            firstName: employeeInfo.firstName,
            lastName: employeeInfo.lastName,
            email: employeeInfo.emailId,
            phoneNo: employeeInfo.phoneNo,
            domain: employeeInfo.domain,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => navigate("/listEmployee"))
        .catch((err) => console.log(err));
    } else {
      getApiService
        .addEmployeeData(
          {
            firstName: employeeInfo.firstName,
            lastName: employeeInfo.lastName,
            email: employeeInfo.emailId,
            phoneNo: employeeInfo.phoneNo,
            domain: employeeInfo.domain,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => navigate("/listEmployee"))
        .catch((err) => console.log(err));
    }
  };

  const modalCancelBtn = () => {
    setShowModal(false);
  };

  const validateInput = (values) => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const numberRegex = /^([0-9]{10})+$/;

    if (!values.emailId) {
      errors.emailId = "ENTER VALID EMAIL ADDRESS";
    } else if (!emailRegex.test(values.emailId)) {
      errors.emailId = "ENTER VALID EMAIL ADDRESS";
    }

    if (!values.phoneNo) {
      errors.phoneNo = "ENTER VALID PHONE NO ADDRESS";
    } else if (!numberRegex.test(values.phoneNo)) {
      errors.phoneNo = "ENTER VALID EMAIL ADDRESS";
    }

    if (Object.keys(errors).length < 1 && values.phoneNo && values.emailId) {
      setShowModal(true);
    }
    return errors;
  };

  return (
    <>
      <div>
        <h2>ADD EMPLOYEE </h2>

        <div className={styles.container__box}>
          <InputFields
            type="text"
            name="firstName"
            placeholder="FIRST NAME"
            onChange={handleInputChange}
            value={employeeInfo.firstName}
          />
          <InputFields
            type="text"
            name="lastName"
            placeholder="LAST NAME"
            onChange={handleInputChange}
            value={employeeInfo.lastName}
          />
        </div>

        <div className={styles.container__box}>
          <InputFields
            type="text"
            name="emailId"
            placeholder="EMAIL ID"
            onChange={handleInputChange}
            value={employeeInfo.emailId}
            errorMessage={submitErrorMsg && submitErrorMsg.emailId}
          />
          <InputFields
            type="text"
            name="phoneNo"
            placeholder="PHONE NO"
            onChange={handleInputChange}
            value={employeeInfo.phoneNo}
            errorMessage={submitErrorMsg && submitErrorMsg.phoneNo}
          />
        </div>
        <div className={styles.container__box}>
          <SelectInput
            id={"ddl1"}
            name={"domain"}
            options={dropDownList}
            onChange={handleInputChange}
            selectedValue={employeeInfo.domain}
          />
          <InputFields className={styles.visible} />
        </div>
        <div className={`${styles.container__box} ${styles.button}`}>
          <ButtonField
            divClassName={`btnContainer`}
            type="button"
            buttonText="DISCARD"
            className={`discard__button`}
            onClick={handleDiscardBtn}
          />
          <ButtonField
            divClassName={`btnContainer`}
            type="button"
            buttonText="SUBMIT"
            className={`submit__button`}
            onClick={handleSubmitBtn}
          />
        </div>
      </div>

      <Modal
        open={showModal}
        closeModal={closeModal}
        message={"Are you Sure?"}
        modalConfirmBtn={modalConfirmBtn}
        modalCancelBtn={modalCancelBtn}
      />
    </>
  );
}

export default AddEmployee;
