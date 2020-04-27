import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Button, TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  


const TodoList = () => {

// set current date on server side when form is submitted
//     const currDateFormat = () => {
//     const currDate = new Date();
//     // padStart ensures length of string will always be 2
//     const dd = String(currDate.getDate()).padStart(2, '0'); 
//     // +1 to Month b/c January returns 0 instead of 1
//     const mm = String(currDate.getMonth() + 1).padStart(2, '0')
//     const yyyy = currDate.getFullYear();

//     currDate = `${yyyy}-{mm}-{dd}`

//     return currDate
//   }
  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#808080',
    margin: '15px 0'
  }

  const taskInitialState = {
    task: '',
    addNote: '',
  }

  const [taskForm, setTaskForm] = useState(taskInitialState);
  const [deadline, setDeadline] = useState(new Date());
  const [completed, setCompleted] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (evt) => setTaskForm({
    ...taskForm,
    [evt.target.name]: evt.target.value
    }
  );

  const handleDateChange = (date) => {
    setDeadline(date);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return (
    <form>
      <div>
        <TextField
          required id="standard-multiline-flexible"
          label="Task"
          name="task"
          multiline
          rowsMax={4}
          onChange={handleChange}
          value={taskForm.task}
          style={{margin: '0 5px 0 0'}}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Additional Notes"
          name="addNote"
          multiline
          rowsMax={4}
          onChange={handleChange}
          value={taskForm.addNote}
          style={{margin: '0 0 0 5px'}}
        />
      </div>  
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Set Deadline"
            format="MM/dd/yyyy"
            value={deadline}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <Button 
        variant="contained" 
        style={buttonStyle} 
        type="submit">
          Submit
      </Button>
    </form>
  )
}
    

export default TodoList;

// comment out all priority related items, implement in future

//   const [priority, setPriority] = useState(null)
//   const priorities = [
//     {
//       value: 'high',
//       label: 'high',
//     },
//     {
//       value: 'low',
//       label: 'low',
//     },
//   ];

//   const handlePriorityChange = (evt) => {
//     setPriority(evt.target.value)
//   }

/* <div>
     <TextField
       id="standard-select-priority"
       select
       label="Priority"
       value={priority}
       onChange={handlePriorityChange}
       helperText="Please select the task's priority level"
      >
      {priorities.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
     </TextField>
   </div> */

   