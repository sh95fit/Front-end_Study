import React, { useState } from 'react';
import './App.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch, connect } from 'react-redux';

var initState = {
  number:1
}

function rootReducer(state=initState, action) {
  const newState = {...state}

  if(action.type === "INCREASE") {
    newState.number++;
  }

  return newState;
}

const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

function App() {
  return (
    <div className="App" id="container">
      <h1>Root</h1>
      <div id='grid'>
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1(props) {
  return (
    <div>
      <h1>Left1 : </h1>
      <Left2></Left2>
    </div>
  )
}

function Left2(props) {
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  )
}

function Left3(props) {
  // function f(state) {
  //   return state.number;
  // }
  // const number = useSelector(f);
  const number = useSelector((state) => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  )
}

function Right1(props) {
  return(
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  )
}

function Right2(props) {
  return(
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  )
}

function Right3(props) {
  const dispatch = useDispatch();
  return(
    <div>
      <h1>Right3</h1>
      <input type="button" value="+" onClick={() => {
        dispatch({type:"INCREASE"})
      }}></input>
    </div>
  )
}


export default App;
