import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { blueGrey, lightBlue } from '@mui/material/colors';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { createTheme, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: blueGrey.A700,
  textAlign: 'center',
  // color: teal[500],
  borderRadius: 0
}));

const Item2 = styled(Paper)(({ theme }) => ({
  // backgroundColor: blueGrey[100],
  textAlign: 'right',
  borderRadius: 0
}));


let disableAddButton = true;





function App() {

  const savedTaskList = localStorage.getItem("task");

  let [task, setTask] = useState("");

  //lazy state, if no saved task list in localstorage then return empty [] else get saved task list
  let [taskList, setTaskList] = useState(() => {
    if (savedTaskList) {
      return JSON.parse(savedTaskList);
    } else {
      return []
    }
  });

  useEffect(() => {
    window.localStorage.setItem('task', JSON.stringify(taskList))
  }, [taskList])

  function handleAddTask(e) {
    e.preventDefault();
    if (task.trim() !== "") {
      let newTask = {
        id: Date.now() + Math.random(),
        label: task,
        completed: false,
        lastUpdateDate: Date.now()
      };

      let newList = [...taskList];
      newList.push(newTask);
      setTaskList(newList);
      setTask("");
      disableAddButton = true;
    }
  }

  function handleCheckedChange(item) {
    let newTaskList = taskList.map((taskItem) => {
      if (taskItem.id === item.id) {
        return ({
          id: taskItem.id,
          label: taskItem.label,
          completed: !taskItem.completed,
          lastUpdateDate: Date.now()
        })
      } else {
        return (taskItem);
      }
    });
    setTaskList(newTaskList);
  }

  function handleDelete(item) {
    let newTaskList = taskList.filter((taskItem) => taskItem.id !== item.id);
    setTaskList(newTaskList);
  }

  function handleClearAll() {
    setTaskList([]);
  }

  function handleClearAllToDo() {
    let removedAllToDoList = taskList.filter((taskItem) => taskItem.completed === true);
    setTaskList(removedAllToDoList);
  }

  function handleClearAllCompleted() {
    let removedAllCompletedList = taskList.filter((taskItem) => taskItem.completed === false);
    setTaskList(removedAllCompletedList);
  }

  const textInput = React.useRef(null);

  function MaxLengthInputError() {

    if(task.length >= 22){
    return (
      <>
        <InputLabel error htmlFor="add-task">Max length: 22</InputLabel>
      </>
    )
  }else{
    return (
      <>
        <InputLabel htmlFor="add-task">Add Task</InputLabel>
      </>
    )

  }
  }


  return (

    <Container maxWidth="md" sx={{ backgroundColor: "black", border: "3px solid lightblue", borderRadius: "12px" }}>

      <div className="App">

        <Stack
          direction="column"
          spacing={3}
          justifyContent="flex-end"
        >
          <Item>
            <Typography variant="h3" fontFamily="Apple Color Emoji" color={lightBlue[50]} backgroundColor={blueGrey[400]}
              sx={{ textAlign: "center", textDecoration: "underline" }}>TODOs
            </Typography>
          </Item>

          {/* 
      <Item sx={{textAlign: 'right',alignSelf:"center"}}>
      <button style={{}} onClick={() => handleClearAll()}>Clear all</button>
      </Item> */}
        </Stack>

        <Stack
          direction="row"
          spacing={0}
          justifyContent="flex-end"
          paddingTop="7px"
          paddingRight="25px"
          paddingBottom="7px"
          backgroundColor={blueGrey[300]}
        >
          <Item2 sx={{ alignSelf: "flex-end", backgroundColor: lightBlue[50] }}>
            <FormControl size="small" variant="standard">
              <MaxLengthInputError />
              <Input inputProps={{ maxLength: 22 }} id="add-task"
                inputRef={textInput}
                onChange={(e) => {
                  setTask(e.target.value);
                  if (e.target.value.trim() !== "") {
                    disableAddButton = false;
                  } else {
                    disableAddButton = true;
                  }
                }
                }
                onKeyUp={(e) => {
                  if(e.key === "Enter"){
                    handleAddTask(e);
                    textInput.current.value = "";
                  }}
                }

              />
            </FormControl>
          </Item2>
          <Tooltip title="Add Task">
            <IconButton
              type="submit"
              alt="Add task"
              disabled={disableAddButton}
              onClick={(e) => {
                handleAddTask(e);
                textInput.current.value = "";
              }
              }
              sx={{ marginLeft: "5px", color: lightBlue[200] }}
            >
              <AddCircleIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>

        </Stack>


        {/* start of "To do list" container */}
        <Stack
          direction="row"
          spacing={0}
          justifyContent="space-around"
          backgroundColor={blueGrey[50]}
          flexWrap="wrap"
        >
          <Item sx={{ paddingTop: "4px", minHeight: "600px" , maxHeight: "800px", minWidth: "320px", maxWidth: "350px", overflow: "auto", whiteSpace: "nowrap" }}>
            <div className="ToDo">
              <Typography variant="h4" fontFamily="Apple Color Emoji" color={lightBlue[50]} backgroundColor={blueGrey[400]}>TO DO
                <Tooltip title="Remove TO DO">
                  <IconButton
                    alt="Clear all to do list"
                    onClick={handleClearAllToDo}
                    sx={{ marginLeft: "5px", color: "lightcoral" }}
                  >
                    <DeleteIcon sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Tooltip>
              </Typography>

              <List sx={{ width: '100%', maxWidth: 360 }}>
                {taskList.filter((item) => item.completed !== true).sort((a,b) => (a.lastUpdateDate) - (b.lastUpdateDate)).map((item) => {
                  const labelId = `checkbox-list-label-${item.id}`;
                  return (
                    <ListItem
                      key={item.id}
                      secondaryAction={

                        <Tooltip title="Delete Task">
                          <IconButton
                            edge="end"
                            alt=">Delete Task"
                            onClick={() => {
                              handleDelete(item)
                            }}
                            sx={{ marginLeft: "5px", color: "lightcoral" }}
                          >
                            <CancelIcon sx={{ fontSize: "2rem" }} />
                          </IconButton>
                        </Tooltip>

                      }
                      disablePadding
                    >
                      <ListItemButton onClick={() => handleCheckedChange(item)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={item.completed}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Item>

          {/* end of "To do list" container */}



          {/* start of "completed" container */}
          <Item sx={{ paddingTop: "4px", minHeight: "600px", maxHeight: "800px", minWidth: "320px", maxWidth: "350px", overflow: "auto", whiteSpace: "nowrap" }}>
            <div className="Completed">
              <Typography variant="h4" fontFamily="Apple Color Emoji" color={lightBlue[50]} backgroundColor={blueGrey[400]}>Completed
                <Tooltip title="Remove TO DO">
                  <IconButton
                    alt="Clear all to do list"
                    onClick={handleClearAllCompleted}
                    sx={{ marginLeft: "5px", color: "lightcoral" }}
                  >
                    <DeleteIcon sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Tooltip>
              </Typography>

              <List sx={{ width: '100%', maxWidth: 360 }}>
            
            {/* do the sorting for first in to remain on top, by using the last updated date .. thinking of a better way to do this, 
            to be check with instructor on sat. */}
                {taskList.filter((item) => item.completed === true).sort((a,b) => (a.lastUpdateDate) - (b.lastUpdateDate)).map((item) => {
                  const labelId = `checkbox-list-label-${item.id}`;
                  return (
                    <ListItem
                      key={item.id}
                      secondaryAction={

                        <Tooltip title="Delete Task">
                          <IconButton
                            edge="end"
                            alt=">Delete Task"
                            onClick={() => {
                              handleDelete(item)
                            }}
                            sx={{ marginLeft: "5px", color: "lightcoral" }}
                          >
                            <CancelIcon sx={{ fontSize: "2rem" }} />
                          </IconButton>
                        </Tooltip>

                      }
                      disablePadding
                    >
                      <ListItemButton onClick={() => handleCheckedChange(item)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={item.completed}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={item.label} sx={{ textDecoration: "line-through" }} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Item>
          {/* end of "completed" container" */}
        </Stack>
      </div >
    </Container>
  );
}

export default App;

