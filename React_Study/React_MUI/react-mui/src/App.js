import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Header() {
  return (
    <header>
      <h1>Welcome</h1>
    </header>);
}

function Nav() {
  return (
    // <nav style={{border: '1px solid gray'}}>
    <nav>
      <ol>
        <li>html</li>
        <li>css</li>
      </ol>
    </nav>
  )
}

function Article() {
  const [open, setOpen] = useState(false);
  return (
    // <article style={{border: '1px solid gray'}}>
    <article>
      <h2>Welcome</h2>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque rerum iste sint eius corporis nulla officia excepturi dolorem a unde. 
      <br />
      <ButtonGroup variant="contained" arial-label="outlined primary button group" style={{marginTop:'20px'}}>
      <Button onClick={()=>{
        setOpen(true);
      }}>Create</Button>
      <Button>Update</Button>
      </ButtonGroup>
      <Button variant="outlined" style={{marginLeft:'20px'}}>Delete</Button>
      <Dialog open={open}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>Hello Create!</DialogContent>
        <DialogActions>
          <Button>Create</Button>
          <Button onClick={()=>{
            setOpen(false);
          }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </article>
  )
}

function App() {
  return (
    <Container fixed className="App">
      <Header></Header>
      <Grid container>
        <Grid item xs={2}>
          <Nav></Nav>
        </Grid>
        <Grid item xs={10}>
          <Article></Article>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
