import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useState } from 'react';
import { useStyles } from './HeaderStyles';
import { Button, Dialog, DialogActions } from '@mui/material';
import UploadDialogBox from './UploadFileDialog';

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const onClick = () => {
    setOpen(true);
  }

  return (
    <AppBar position="sticky" style={{ background: '#263238' }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          &nbsp; File Share
        </Typography>
        <Button variant='contained' onClick={onClick}>
          Upload file
        </Button>
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{paper: classes.uploadDialogBox}}
      >
        <UploadDialogBox />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
