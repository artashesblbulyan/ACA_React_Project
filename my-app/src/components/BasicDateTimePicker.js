import React, {useContext } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClockIcon from '@mui/icons-material/AccessTime';
import { DateTimeContext } from '../context/context';
function BasicDateTimePicker() {
  const {timeDate,setTimeDate} = useContext(DateTimeContext)

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DateTimePicker
         disableFuture
         hideTabs
        renderInput={(val) =>{
          return(<TextField {...val}/>)}}
        label="DateTimePicker"
        components={{
          LeftArrowIcon: ArrowBackIosIcon,
          RightArrowIcon: ArrowForwardIosIcon,
          OpenPickerIcon: ClockIcon,
        }}
        value={timeDate}
        onChange={(newValue) => {
          setTimeDate(newValue);
        }}
        views={['year', 'day', 'hours']}
      />
     </LocalizationProvider>
  );
}

export default BasicDateTimePicker;