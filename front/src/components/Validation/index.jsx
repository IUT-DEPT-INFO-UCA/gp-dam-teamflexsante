import React from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";

const Validation = (props) => {
  const { validation, resetValidation } = props;

  if (!validation) {
    return null;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    resetValidation();
  };

  return (
    <Snackbar
      open={validation !== ""}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {validation}
      </Alert>
    </Snackbar>
  );
};

Validation.propTypes = {
  validation: PropTypes.string.isRequired,
  resetValidation: PropTypes.func.isRequired,
};

export default Validation;
