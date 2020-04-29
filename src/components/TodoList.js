import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem.js';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, Button, TextField } from '@material-ui/core';
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

  const [taskList, setTaskList] = useState([]);
  const [taskForm, setTaskForm] = useState(taskInitialState);
  const [deadline, setDeadline] = useState(new Date());
  const [formSuccess, setFormSuccess] = useState(false);


  const handleChange = (evt) => setTaskForm({
    ...taskForm,
    [evt.target.name]: evt.target.value
    }
  );

  const handleDateChange = (date) => {
    setDeadline(date);
  };

  // create an async await function 
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const userInput = {taskForm, deadline}
      const response = await fetch('/todo-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput)
      }); 
      // add new task to list of tasks after user submit
      setTaskList(currList => [...currList, userInput])
    //   console.log(taskList, 'after taskList');

       // add useEffect function here to update component 
    } catch (error) {
        console.log(`Error: ${error}`)
    } 
  }
    
  


  return (
    <Grid>
      <Grid item xs={12}
            container 
            justify="center"
            alignItems="center"
            alignContent="center">
    <form onSubmit={handleSubmit}>
      <div>
        {/* can create 1 TextField to reuse */}
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
    </Grid>
    <Grid item xs={12}
          container 
          justify="center"
          alignItems="center"
          alignContent="center">
      <ToDoItem taskList={taskList} />
    </Grid>
    </Grid>
  );
}
    

export default TodoList;

