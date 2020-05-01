import React, { useState, useEffect } from 'react';
import BackLink from './BackLink.js';
// import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
    Grid, 
    Paper,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    // ListItemIcon,
    ListItemSecondaryAction
 } from '@material-ui/core';


const CompletedTasks = () => {

  const [completedList, setCompletedList] = useState([]);
//   console.log(completedList, 'completedList')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/completed-tasks');
      const jsonResponse = await response.json();
      setCompletedList(jsonResponse);
    }
    fetchData();
  }, []);


  const removeClickHandler = async (taskId) => {
    // reformat into component since already using in TodoList
    try {
      const response = await fetch('/remove-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: taskId
      }); 
      if (response.ok) {
        setCompletedList(completedList.filter(task => task.taskId !== taskId));
      }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
  };
  

  if (completedList.length === 0) {
    return (
      <Grid 
        item xs={12}
        container 
        justify="center"
        alignItems="center"
        alignContent="center">
          <BackLink selectedLink={'/todo-list'} />
          <p><em>You have not completed any tasks yet.</em></p>
      </Grid>
    )
  }
  

  return (
    <Grid 
      item xs={12} md={12}
      container 
      justify="center">
      <BackLink selectedLink="/todo-list" />
      <Grid item xs={12} 
            container 
            justify="center"
            alignItems="center"
            className="todo-container">
      <Paper elevation={2}>
        <List>
          {completedList.map((task) => {
            return (
              <div key={task.taskId}>
                <ListItem 
                  alignItems="flex-start">
                  <ListItemText 
                    style={{wordWrap: 'break-word', maxWidth: '90%'}}
                    primary={task.taskForm.task}
                    secondary={task.taskForm.addNote ? 
                        (`Additional Notes: ${task.taskForm.addNote}`) 
                        : null} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" 
                              aria-label="delete" 
                              onClick={() => removeClickHandler(task.taskId)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              <Divider/>
            </div>
            )
          })}
        </List> 
      </Paper>
    </Grid>
  </Grid>
  )
}

export default CompletedTasks;