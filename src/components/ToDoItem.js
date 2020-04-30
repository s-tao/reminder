import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
    Grid,
    Button, 
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

  const [open, setOpen] = useState(false);  
  const [confirmRemove, setConfirmRemove] = useState(false);

//   const [completed, setCompleted] = useState(false);
  
  // handles function from parent component, passes selected taskId back 
  const removeClickHandler = (taskId) => {
    console.log(taskId, 'taskId')
    removeTask(taskId);
    setConfirmRemove(false);
    closeDialogBox();
  }

  const openDialogBox = (taskId) => {
    setOpen(true)
    console.log(taskId, 'taskId')

    if (confirmRemove === true) {
      console.log('this ran')
      removeClickHandler(taskId);

    }
  }
  console.log(confirmRemove, 'confirmRemove')
  const closeDialogBox = () => {
    setOpen(false)
    // console.log(confirmRemove, 'confirmRemove false')
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
                      <span>
                        {task.taskForm.addNote ? `Additional Notes: ${task.taskForm.addNote}` : null}
                      </span>
                      <span>
                        {task.deadline ? `Complete by: ${new Date(task.deadline).toDateString()}` : null}
                      </span>
                    </span>
                  } />
                <ListItemSecondaryAction>
                  <IconButton edge="end" 
                              aria-label="delete" 
                              onClick={() => openDialogBox(task.taskId)}>
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
      <Dialog
        open={open}
        // onClose={triggerClickHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to remove this task"}
      </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once confirmed, task will be removed from your to-do list. You will 
            have to re-enter the task item again if you change your mind. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogBox} color="primary">
            No
          </Button>
          <Button onClick={() => setConfirmRemove(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )

}

export default ToDoItem;



