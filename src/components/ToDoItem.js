import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
import { 
    Grid, 
    Paper,
    Divider,
    IconButton,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    // ListItemIcon,
    ListItemSecondaryAction
 } from '@material-ui/core';


const ToDoItem = ({taskList, removeTask, completedTask}) => {
    
//   console.log(taskList, 'taskList')
  // handles function from parent component, passes selected taskId back
  const removeClickHandler = (taskId) => {
    removeTask(taskId);
  }

  const checkHandler = (taskId) => {
    completedTask(taskId);
  }

  if (taskList.length === 0) {
    return (
      <p><em>You currently have no tasks to do.</em></p>
    )
  }
  
  return (
    <Grid item xs={12} md={12} > 
      <Paper elevation={2}>
        <List>
          {taskList.map((task) => {
            return (
              <div key={task.taskId}>
                <ListItem 
                  alignItems="flex-start">
                  <ListItemText 
                    style={{wordWrap: 'break-word', maxWidth: '90%'}}
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
                <Checkbox
                  edge="end"
                  color="primary"
                //   checked={task.taskId}
                  onClick={()=> checkHandler(task.taskId)}
                // inputProps={{ 'aria-labelledby': labelId }}
              />
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
          <Link to="/completed-tasks">
            <p style={{textAlign: 'center'}}>See all completed tasks</p>
          </Link>
        </List> 
      </Paper>
    </Grid>
  )

}

export default ToDoItem;


