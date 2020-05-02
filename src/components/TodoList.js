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
    isComplete: false
  }

  const [taskList, setTaskList] = useState([]);
  const [taskForm, setTaskForm] = useState(taskInitialState);
  const [deadline, setDeadline] = useState(new Date());

  // fetch data from server, second arg triggers when to rerun useEffect
  // fetch + json are async functions
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/todo-list'); 
      const jsonResponse = await response.json();
      setTaskList(jsonResponse);
    } 
    fetchData();
    console.log('fetch: success');
  }, []);


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
      const jsonResponse = await response.json();
      userInput['taskId'] = jsonResponse.taskId
      // add new task to list of tasks after user submit
      setTaskList(currList => [...currList, userInput])
       // add useEffect function here to update component 
    } catch (error) {
        console.log(`Error: ${error}`)
    } 
    // reset states after user submits
    setTaskForm({...taskInitialState})
    setDeadline(new Date())
  }
   
  // could be in its own component to reuse w/ completed Task, change fetch route
  const removeTask = async (taskId) => {
    try {
      const response = await fetch('/remove-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: taskId
      }); 
      if (response.ok) {
        setTaskList(taskList.filter(task => task.taskId !== taskId));
      }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
  };

  const completedTask = async (taskId) => {
    try {
      const response = await fetch('/completed-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: taskId
      }); if (response.ok) {
        // changes isComplete in task to true
        // setTaskList(taskList.map((task) => task.taskId === taskId ? ({...task, isComplete : true}) : task));
            setTaskList(taskList.filter(task => task.taskId !== taskId));
       }
    } catch (error) {
        console.log(`Error: ${error}`)
     }
  };
  
  return (
    <Grid container 
          justify="center">
      <Grid item xs={12}
            container 
            justify="center"
            alignItems="center"
            alignContent="center">
      <form onSubmit={handleSubmit}>
        <div>
          {/* can create 1 TextFieljd to reuse */}
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
      {/* <Grid item xs={10}
            container
            justify="center">
        <p style={{textAlign: "center"}}>
          <em>Activate the star icon if you want text reminders. You will receive a
          text 24 hours before your task is due.</em>
        </p>         
      </Grid> */}
      <Grid item xs={12} 
            container 
            justify="center"
            alignItems="center"
            className="todo-container"
            style={{padding:'0 0 15px 0'}}>
        <ToDoItem taskList={taskList} 
                  removeTask={removeTask}
                  completedTask={completedTask} />
      </Grid>
    </Grid>
  );
}
    

export default TodoList;




