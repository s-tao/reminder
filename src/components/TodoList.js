import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Button, TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  

const TodoList = () => {

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#808080',
    margin: '15px 0'
  }

  const taskInitialState = {
    task: '',
    addNote: '',
    completed: false
  }

  const [taskForm, setTaskForm] = useState(taskInitialState);
  const [deadline, setDeadline] = useState(new Date());
//   const [formSuccess, setFormSuccess] = useState(false);

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
    fetch('/todo-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({taskForm, deadline})
    })
  
  }


  return (
    <form onSubmit={handleSubmit}>
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

