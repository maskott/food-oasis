import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AccountAutocomplete from "./AccountAutocomplete";
import { Button } from "../../components/UI";

function AssignDialog(props) {
  const { onClose, open, ...other } = props;
  const [accountId, setAccountId] = useState(null);

  const handleCancel = () => {
    onClose(false);
  };

  const handleAssign = () => {
    onClose(accountId);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Assign to:</DialogTitle>
      <DialogContent dividers>
        <AccountAutocomplete
          name="assignedLoginId"
          accountId={accountId}
          setAccountId={(assignedAccountId) => setAccountId(assignedAccountId)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} text="Cancel" />
        <Button text="Assign" onClick={handleAssign} disabled={!accountId} />
      </DialogActions>
    </Dialog>
  );
}

AssignDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AssignDialog;
