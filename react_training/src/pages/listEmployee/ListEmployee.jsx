import { Button } from "@mui/base";
import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./ListEmployee.module.scss";

import ButtonField from "../../components/buttons/ButtonField";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import EmsService from "../../services/api/emsService";

function ListEmployee() {
  const getApiService = new EmsService();
  const navigate = useNavigate();
  let accessToken = sessionStorage.getItem("accessToken");
  const adminName = sessionStorage.getItem("userName");
  const [employeeList, setEmployeeList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getApiService
      .getEmployeeData({
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => setEmployeeList([response]))
      .catch((err) => console.log(err));
    if (!accessToken) navigate("/");
  }, []);

  const addEmployee = () => {
    navigate("/addEmployee");
  };

  const handleEditBtn = (value) => {
    navigate("/addEmployee", { state: { value } });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modalCancelBtn = () => {
    setShowModal(false);
  };

  const handleDeleteBtn = (value) => {
    setShowModal(true);
    setDeleteIndex(value._id);
  };

  const modalConfirmBtn = () => {
    getApiService
      .deleteEmployeeData(deleteIndex, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        if (response.message == "Employee deleted successfully") {
          navigate("/listEmployee");
          setShowModal(false);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleMenu = (event) => {
    setAnchorEl(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <div className={styles.top__bar}>
          <h3>LIST OF EMPLOYEES</h3>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            className={styles.menu__icon}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <p>{adminName}</p>
            </MenuItem>
            <MenuItem
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
            >
              <p>Log out</p>
            </MenuItem>
          </Menu>
        </div>
        <div>
          <ButtonField
            type="button"
            buttonText="ADD"
            divClassName="add__button"
            className="addBtnText"
            onClick={addEmployee}
          />
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Phone No</th>
                <th>Domain</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employeeList &&
                employeeList[0].map((value, index) => (
                  <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
                    <td>{value.email}</td>
                    <td>{value.domain}</td>
                    <td className={styles.action__button}>
                      <ButtonField
                        type="button"
                        className="edit__button"
                        buttonText="Edit"
                        onClick={() => handleEditBtn(value)}
                      />
                      <ButtonField
                        type="button"
                        className="delete__button"
                        buttonText="Delete"
                        onClick={() => handleDeleteBtn(value)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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

export default ListEmployee;
