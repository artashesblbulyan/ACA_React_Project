import {Box, Button, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, {useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import BasicDateTimePicker from "./BasicDateTimePicker";
import { DateTimeContext } from "../context/context";
import dayjs from "dayjs";




function EditDialogSection (props){

  const [editInputValue,setEditInputCalue] = React.useState(props.value)
  const [timeDate,setTimeDate] = useState(dayjs(new Date()))

  const onChange = (e)=>{
    setEditInputCalue(e.target.value)
  }
  const saveEdit = ()=>{
    props.todoEditSave(editInputValue,timeDate)
  }
   return (
    <Dialog 
      maxWidth={"sm"}
      fullWidth={true}
      open={true} 
      onClose={props.onClose} >
        <DialogTitle>Edit Todo</DialogTitle>
   <DialogActions>
   <DialogContent>
   <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'initial',
            }}
          >
      <DateTimeContext.Provider value={{timeDate,setTimeDate }} sx={{width:"100%" }}>
          <BasicDateTimePicker />
      </DateTimeContext.Provider>
      <TextField sx={{width:"100%" }} value={editInputValue} onChange={onChange} variant="outlined"
        multiline
        maxRows={10} 
        style={{paddingTop: "5px"}}
        />
        </Box>
   </DialogContent>
     <Button  onClick={saveEdit}>save</Button>
     <Button  onClick={props.onClose}>no</Button>
   </DialogActions>
 </Dialog>
  );
}

export default EditDialogSection;
