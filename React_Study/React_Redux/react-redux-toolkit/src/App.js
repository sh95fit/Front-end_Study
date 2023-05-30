import React from 'react';
import './App.css';

// import { createStore } from 'redux';
import {Provider, useSelector, useDispatch} from 'react-redux';
import store from './store';
// import counterSlice from './counterSlice';
import {up} from './counterSlice';

/*
function reducer(state, action) {
  if(action.type === 'up') {
    return {...state, value:state.value + action.step}
  }
  return state;
}

const initialState = {value:0}

const store = createStore(reducer, initialState);
*/

function Counter() {
  const dispatch = useDispatch()
  const count = useSelector(state => {
    return state.counter.value;
  });
  return <div>
    <button onClick={() => {
      // dispatch({type:'count/up', step:2});
      // dispatch(counterSlice.actions.up(2))
      dispatch(up(2))
    }}>+</button> {count}
  </div>
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
