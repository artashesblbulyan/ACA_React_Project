import Checkbox from '@mui/material/Checkbox';
import React from "react"



function CheckboxSection (props){
  
  const handleChange = (event) => {
    props.onChecked(event.target.checked)
  }

   return (
    <Checkbox
    checked={props.checked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'controlled' }}
/>
        );
}

export default CheckboxSection;
