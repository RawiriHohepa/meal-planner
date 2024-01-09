import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

interface NewMealDialogProps {
  open: boolean;
  onSubmit: (name: string) => void;
  closeDialog: () => void;
}

const NewMealDialog = ({ open, onSubmit, closeDialog }: NewMealDialogProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateName = () => {
    if (!name.trim()) {
      setError("Name must not be empty");
      return false;
    }

    setError("");
    return true;
  };

  const handleClose = () => {
    setName("");
    setError("");
    closeDialog();
  };

  const handleCancel = handleClose;

  const handleSubmit = () => {
    if (validateName()) {
      onSubmit(name);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      <DialogTitle>Add New Meal</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          label="Meal Name"
          type="string"
          fullWidth
          variant="standard"
          error={!!error}
          helperText={error}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMealDialog;
