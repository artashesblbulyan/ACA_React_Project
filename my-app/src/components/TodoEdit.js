import { Button } from "@mui/material";
import React from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


class TodoEdit extends React.Component{
   state={open:false}

 onClickDelete =()=>{
   this.setState({open:true})
 }
 handleClose=(e)=>{
   if(e.target.value === 'no'){
      this.setState({open:false})
   }
   else{
      this.props.onRemove(this.props.data.id)
      this.setState({open:false})
   }

 }
 render (){
   return (
    <li style={{width:"96%",display:"flex",justifyContent:"space-between",background: "#999",margin:"2px",padding:"10px"}}>
      {this.props.data.value}<IconButton onClick={this.onClickDelete} aria-label="delete" size="small" style={{background: "#666"}}>
    <DeleteIcon fontSize="small" />
  </IconButton>
  <Dialog open={this.state.open}>
        <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
        <DialogActions>
          <TextField value={this.state.inputValue} onChange={this.onChange} id="outlined-basic" label="Todo" variant="outlined" style={{width:"70%",marginRight:"2px"}} />
          <Button value='no'onClick={this.handleClose}>no</Button>
        </DialogActions>
      </Dialog>
  </li>
   );
}}

export default TodoEdit;
