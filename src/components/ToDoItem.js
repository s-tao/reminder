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


const ToDoItem = ({taskList, removeTask}) => {

  // future add feature -> confirm yes before officially removing task
//   const [completed, setCompleted] = useState(false);
  
  // handles function from parent component, passes selected taskId back
  const removeClickHandler = (taskId) => {
    removeTask(taskId);
  }

  if (taskList.length === 0) {
    return (
      <p><em>You currently have no tasks to do.</em></p>
    )
  }
  
  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={2}>
        <List component={'div'}>
          {taskList.map((task) => {
            return (
              <div key={task.taskId}>
                <ListItem 
                  alignItems="flex-start"
                  component={'div'}>
                  <ListItemText 
                    component={'div'}
                    primary={task.taskForm.task}
                    secondary={
                    <span>
                      <span>
                        {task.taskForm.addNote ? (`Additional Notes: ${task.taskForm.addNote}`) : null}
                        {task.taskForm.addNote ? <br></br> : null}
                      </span>
                      <span>
                        {task.deadline ? `Complete by: ${new Date(task.deadline).toDateString()}` : null}
                      </span>
                    </span>
                  } />
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
  )

}

export default ToDoItem;



