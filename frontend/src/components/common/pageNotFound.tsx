import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
export default function PageNotFound() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Page Not Found"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sorry can get to the page!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Fab variant="extended" onClick={handleClose}>
            <UndoIcon sx={{ mr: 1 }} />
            Back
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}
