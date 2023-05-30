// import { legacy_createStore as createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

var initState = {
  mode:'READ',
  welcome_content:{
    title:'WEB',
    desc:'Hello, WEB'
  },
  selected_content_id:1,
  contents: [
    {id:1, title:'HTML', desc:'HTML is ...'},
    {id:2, title:'CSS', desc:'CSS is ...'},
    {id:3, title:'JavaScript', desc:'JavaScript is ...'}
  ]
}

function rootReducer(state=initState, action) {
  if(action.type === 'CHANGE_MODE') {
    return {...state, mode:action.mode};
  }
  return state;
}


export default configureStore({
  reducer: rootReducer,
  devTools: true
});