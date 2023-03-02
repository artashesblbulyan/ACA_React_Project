import React, { useState } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogSection from "./DialogSection";
import EditDialogSection from "./EditDialogSection";
import CheckboxSection from "./CheckboxSection";
import {  createUseStyles } from 'react-jss';
import clsx from "clsx";



const useStyles = createUseStyles({
  li:{
  width:"96.5%",
  display:"flex",
  justifyContent:"space-between",
  background: "#999",
  margin:"7px",
  padding:"10px",
  alignItems: "center",
  boxShadow:" 0 2px 5px rgb(0 0 0 / 50%)",
  // border: "1px solid #ccc",
},
li1:{
  width:"96.5%",
  display:"flex",
  justifyContent:"space-between",
  background: "#666",
  margin:"7px",
  padding:"10px",
  alignItems: "center",
  boxShadow:" 0 2px 5px rgb(0 0 0 / 50%)",
  // border: "1px solid #ccc",
},
spanTime:{
  marginRight:"5px",
  color:"black",
  fontSize:"14px"
},
IconButton:{
  background: "#666",
  marginBlockEnd:"1px",
  margin:"1px"
},
h4:{
  margin:"0px",
  
}
})

function Todoitem (props){

  const [deleteWindow, setDeleteWindow] = useState(false)
  const [editWindow, setEditWindow] = useState(false)
  const classes = useStyles(props)

  const closeWindows =()=>{
    setEditWindow(false)
    setDeleteWindow(false)
  }

 const onClickDelete =()=>{
  setDeleteWindow(true)
 }
 const onClickEdit = () => {
  setEditWindow(true)

 }
 const onRemove=()=>{
   props.onRemove(props.data.id)
   closeWindows()
 }

 const todoEditSave = (value,dateValue) =>{
    props.onEditItem(props.data.id,value,dateValue)
    closeWindows()
 }

 const handleChange = (value) => {
  props.onChecked(value,props.data.id)
}
const hendlEven = () => {
  console.log(props)
    return props.data.pk%2===0?true:false
}
   return (
    <li className={clsx(classes.li,{[classes.li1]:hendlEven()})}>
      <CheckboxSection
      checked={props.data.checked}
      onChecked={handleChange}
      />
      <div  style={{width:"70%",alignItems: "center"}}>
        <span className={classes.h4}>{props.data.value}</span>
      </div>
      <div>
        <span className={ classes.spanTime}>{props.data.dateTime}</span>
        <IconButton onClick={onClickEdit} aria-label="edit" size="small" className= {classes.IconButton}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={onClickDelete} aria-label="delete" size="small" className= {classes.IconButton}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
      { deleteWindow &&
          <DialogSection onClose={closeWindows}  onClick={onRemove}/>
      }
      {
        editWindow && 
          <EditDialogSection value={props.data.value} todoEditSave={todoEditSave} onClose={closeWindows} />
      }
    </li>
   );
}

export default Todoitem;
