import React from "react";
import { Snackbar, Alert } from "@mui/material";

const ToastMessage = ({ show, setShow, toastData }: any) => {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShow(false);
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000} // Auto-hide after 3 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // Top-right position
    >
      <Alert
        onClose={handleClose}
        severity={toastData.type}
        sx={{
          width: "100%",
          color: "#fff", // White text
          bgcolor: toastData.type === "success" ? "#2e7d32" : toastData.type === "warning" ? "#f4a836" : "#d32f2f", // Darker green for success, darker red for error
          fontWeight: "bold",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Soft shadow
        }}
      >
        {toastData.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
