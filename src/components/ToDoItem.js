import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
    Grid, 
    Paper,
    Divider,
    IconButton,
    // Checkbox,
    List,
    ListItem,
    ListItemText,
    // ListItemIcon,
    ListItemSecondaryAction
 } from '@material-ui/core';


const ToDoItem = ({taskList}) => {


  // create onClick listener for items selected to remove task, when clicked, 
  // send item to server to remove from database 
  // future add feature -> confirm yes before officially removing task
  const [remove, setRemove] = useState(false);
//   const [completed, setCompleted] = useState(false);
  
  const removeClickHandler = () => {
    setRemove(!remove)
    console.log(remove, 'remove')
  }

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
                <div key={task.taskId}>
              <ListItem 
                alignItems="flex-start">
                <ListItemText 
                  primary={task.taskForm.task}
                  secondary={
                    <span>
                      <span>{task.taskForm.addNote ? `Additional Notes: ${task.taskForm.addNote}` : null}</span>
                      <span>{task.deadline ? `Complete by: ${new Date(task.deadline).toDateString()}` : null}</span>
                    </span>
                  } />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={removeClickHandler}>
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
  )

}

export default ToDoItem;



