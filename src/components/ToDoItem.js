import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
    Grid, 
    Paper,
    Divider,
    IconButton,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction
 } from '@material-ui/core';


const ToDoItem = ({taskList}) => {

  console.log(taskList, 'taskList @ todoItem');

  // create onClick listener for items selected to remove task, when clicked, 
  // send item to server to remove from database 
  // future add feature -> confirm yes before officially removing task
  const [remove, setRemove] = useState(false);
  const [completed, setCompleted] = useState(false);

  
  if (taskList.length === 0) {
    return (
      <p><em>You currently have no tasks to do.</em></p>
    )
  }
  
  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={2}>
        <List>
          {taskList.map((task) => {
            return (
                <>
              <ListItem 
                alignItems="flex-start"
                key={task.taskForm.task}>
   
                <ListItemText 
                  primary={task.taskForm.task}
                  secondary={
                    <div>
                      <div>{task.taskForm.addNote ? `Additional Notes: ${task.taskForm.addNote}` : null}</div>
                      <div>{task.deadline ? `Complete by: ${task.deadline.toDateString()}` : null}</div>
                    </div>
                  } />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
            </>
            )
          })}
        </List> 
      </Paper>
    </Grid>
  )

}

export default ToDoItem;



