import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface ConfirmDialogProps {
  open: boolean;
  handleClose: () => void;
  confirm: () => void;
  cancel: () => void;
  id: any;
}

export const ConfirmDialog = ({
  open,
  handleClose,
  confirm,
  cancel,
  id,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Clear form?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Your data will be cleared if you navigate away from this tab. Do you
          want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color='primary'>
          No
        </Button>
        <Button
          onClick={confirm}
          color='primary'
          autoFocus
          id={`oneOf-${id}-confirm-yes`}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
