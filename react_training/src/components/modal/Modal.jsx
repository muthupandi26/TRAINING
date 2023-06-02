import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./Modal.module.scss";
import ButtonField from "../buttons/ButtonField";

function Modal(props) {
  const { open, closeModal, message, modalConfirmBtn, modalCancelBtn } = props;

  return (
    <div>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle className={styles.modal__box}>
          {message}
          <div className={styles.modal__BtnContainer}>
            <ButtonField
              className="modal__cancelBtn"
              type="button"
              buttonText="CANCEL"
              onClick={modalCancelBtn}
            />
            <ButtonField
              className="modal__confirmBtn"
              type="button"
              buttonText="CONFIRM"
              onClick={modalConfirmBtn}
            />
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Modal;
