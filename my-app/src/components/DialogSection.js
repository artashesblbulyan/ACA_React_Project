import { Button } from "@mui/material";
import React from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';



function DialogSection (props){
   return (
        <Dialog 
              open
              onClose={props.onClose}>
              <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
              <DialogActions>
                <Button value='yes' onClick={props.onClick}>yes</Button>
                <Button value='no'onClick={props.onClose}>no</Button>
              </DialogActions>
            </Dialog>
        );
}

export default DialogSection;
