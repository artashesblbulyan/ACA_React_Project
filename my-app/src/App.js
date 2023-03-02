
import './App.css';
import React, {useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import Todoitem from './components/Todoitem';
import Checkbox from '@mui/material/Checkbox';
import BasicDateTimePicker from './components/BasicDateTimePicker';
import {Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {  createUseStyles } from 'react-jss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { DateTimeContext } from './context/context';
import dayjs from 'dayjs';
import {Routes,Route, BrowserRouter} from "react-router-dom";
import ProfileApp from './components/profile/ProfileApp';


const useStyles = createUseStyles({
  appDiv:{
    padding: "30px",
    background:"#eee",
    width:"70%",
    checked:false,
    boxShadow:" 0 2px 6px rgb(0 0 0 / 50%)",
  },
  ButtonApp:{
    height: "55px",
    width:"8%",
    marginLeft:"2px",
    boxShadow:" 0 2px 4px rgb(0 0 0 / 50%)",
    // border: "1px solid #ccc",
  },
  TextField:{
    width:"40%",
    marginRight:"2px",
    // boxShadow:" 0 2px 4px rgb(0 0 0 / 50%)",
    // border: "1px solid #ccc",
  },
  buttonAdd5:{
    textDecoration: "none",
    // color: "inherit",
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.43",
    letterSpacing:" 0.01071em",
    borderRadius:" 4px",
    textAlign: "center",
    boxSizing: "border-box",
    minWidth: "32px",
    height: "32px",
    padding: "0 6px",
    margin: "0 3px",
    color: "rgba(0, 0, 0, 0.40)",
    border: "1px solid rgba(0, 0, 0, 0.23)"
  },
  Stack:{
    justifyContent:"center",background: "#rgb(215 215 215)",margin:"7px",
  padding:"10px",
  alignItems: "center",
  boxShadow:" 0 2px 5px rgb(0 0 0 / 50%)"
  }
})

function App (){
  const [inputValue,setinputValue] = useState("")
  const [timeDate,setTimeDate] = useState(dayjs(new Date()))
  const [checked,setChecked] = useState(false)
  const [item,setItem] = useState([])
  const [sortItem,setSortItem] = useState('pk')
  const [sortItemDirection,setSortItemDirection] = useState(true)
  const [pk,setPk] = useState(0)
  const [page, setPage] = useState(1)
  const [numberLinesPage ,setNumberLinesPage] = useState(5)

  const classes = useStyles()


  const onChange =(e)=>{
    setinputValue(e.target.value)
  }
  const onClick = ()=>{
    setPk(pk+1)
    setTimeDate(dayjs(new Date()))
    if(inputValue !== "" ){
      setItem(item.concat([{"pk":pk,"id":uuidv4(),"value":inputValue,"checked":false,"dateTime":timeDate.format('MM/DD/YYYY hh:mm'),"numberPage":Math.ceil((item.length+1)/numberLinesPage)}]))
      setinputValue('')
    }
    
  }
  const onRemove =(id)=>{
    const newItem =item.filter((elem)=>elem.id !== id)
    setItem(newItem.map((elem,index)=>{
      console.log(index)
        return{
          ...elem,
          numberPage:Math.ceil((index+1)/numberLinesPage)
        }
      }
    ))
  }

  const editItem = (id,newValue,newDate) => {
    setItem(item.map((elem) => {
      if(elem.id === id){
        return{
          ...elem,
          value:newValue,
          dateTime:newDate.format('MM/DD/YYYY hh:mm')
        }
      }
      return elem
    }))
  }

  const handleChangeChechbox = (event) => {
    setChecked(event.target.checked)
    setItem(item.map(elem=>{
      return{
        ...elem,
        checked:event.target.checked
      }
    }))
  }

  const checkedEdit = (value,id) => {
    setItem(item.map(elem=>{
      if(elem.id === id){
        return{
          ...elem,
          checked : value
        }
      }
      return elem
    }))
  }
  const onClickDeletMarked =()=> {
    const filterCheckItem =item.filter(elem=>elem.checked === false)
    // setItem(filterCheckItem)
    setItem(filterCheckItem.map((elem,index)=>{
        return{
          ...elem,
          numberPage:Math.ceil((index+1)/numberLinesPage)
        }
      }
    ))
    setChecked(false)
  }

 const sortItemChange =(event, newValue)=>{
  setSortItem(newValue)
 }

 const sortItemOnClick =()=>{
  setSortItemDirection((sortItemDirection)=>!sortItemDirection)
  setItem([...item.sort(
    (p1, p2) => {
      if(sortItemDirection){
        if (p1[sortItem] < p2[sortItem]) {
          console.log(p1)
          return -1;
        }
        if (p1[sortItem] > p2[sortItem]) {
          return 1;
        }
        return 0;
      }
      
      else {
        if (p1[sortItem] > p2[sortItem]) {
          return -1;
        }
        if (p1[sortItem] < p2[sortItem]) {
          return 1;
        }
        return 0;
      }
    
    })])
 }
 const handleChangePage =(event,value)=>{
  setPage(value);
 }

 const onChangeNumberLinesPage =(e)=>{
      if(e.target.name === "reduce"){
      if(numberLinesPage>5){
      setNumberLinesPage(numberLinesPage-5)
      }}
      else{
        if(item.length > numberLinesPage)
        setNumberLinesPage(numberLinesPage+5)
      }
 }
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<ProfileApp/>}/>
        </Routes>
      </BrowserRouter>

      <div className="App"  >
        <div  className={classes.appDiv}>
          <h1>Todo List </h1>
              <Checkbox
                checked={checked}
                onChange={handleChangeChechbox}
                inputProps={{ 'aria-label': 'controlled' }}
                  />
              <TextField value={inputValue} onChange={onChange} id="outlined-basic" label="Todo" variant="outlined" className={classes.TextField} />
              <DateTimeContext.Provider value={{ timeDate,setTimeDate }}>
                <BasicDateTimePicker />
              </DateTimeContext.Provider>
              <Button variant="contained" onClick={onClick} className={classes.ButtonApp}>ADD</Button>
              <Button variant="contained" onClick={onClickDeletMarked} className={classes.ButtonApp}>Delete marked</Button>
              <Box sx={{ width: '100%' }} >
                <Tabs
                  value={sortItem}
                  onChange={sortItemChange}
                  aria-label="wrapped label tabs example"
                  variant="fullWidth"
                  onClick={sortItemOnClick} >
                  <Tab
                    value="pk" 
                    label="id"
                    wrapped
                    icon={(sortItemDirection && sortItem === "pk") ? <ExpandLessIcon /> : <ExpandMoreIcon/>} iconPosition="end"
                  />
                  <Tab value="value" label="text" 
                  icon={(sortItemDirection && sortItem === "value")? <ExpandLessIcon /> : <ExpandMoreIcon/>} iconPosition="end"
                  />
                  <Tab value="dateTime" label="data" 
                  icon={(sortItemDirection && sortItem === "dateTime") ? <ExpandLessIcon /> : <ExpandMoreIcon/>} iconPosition="end"
                  />
                </Tabs>
              </Box>
              <ul style={{paddingInlineStart:"0",borderTop: "solid 5px"}} >
                {item.filter((elem,index)=>Math.ceil((index+1)/numberLinesPage) === page).map((elem) =>{
                  return <Todoitem  key={elem.id} data={elem} onRemove={onRemove} onEditItem={editItem} onChecked={checkedEdit} />
                  })}
              </ul>
              <Stack spacing={2} className={classes.Stack}  direction="row">
              <Button variant="outlined" className={classes.buttonAdd5} name="reduce" onClick={onChangeNumberLinesPage}>-5</Button>
              <Pagination count={Math.ceil((item.length)/numberLinesPage)} variant="outlined" shape="rounded" page={page}  onChange={handleChangePage}  color="primary"/>
              <Button variant="outlined" className={classes.buttonAdd5} name="add" onClick={onChangeNumberLinesPage}>+5</Button>
              </Stack>
          
        </div>
      </div>
     
      </>
    );
  }


export default App;
