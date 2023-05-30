// import { legacy_createStore as createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

var initState = {
  mode:'WELCOME',
  welcome_content:{
    title:'WEB',
    desc:'Hello, WEB'
  },
  selected_content_id:null,
  max_content_id:3,
  contents: [
    {id:1, title:'HTML', desc:'HTML is ...'},
    {id:2, title:'CSS', desc:'CSS is ...'},
    {id:3, title:'JavaScript', desc:'JavaScript is ...'}
  ]
}

function rootReducer(state=initState, action) {
  if(action.type === 'WELCOME') {
    return {...state, mode:action.type};
  } else if(action.type === 'READ') {
    return {...state, mode:'READ', selected_content_id:action.id}
  } else if(action.type === "CREATE") {
    return {...state, mode:'CREATE'}
  } else if(action.type === "CREATE_PROCESS") {
    var newId = state.max_content_id+1
    var newContents = [...state.contents, {id:newId, title:action.title, desc:action.desc}];
    return {...state, contents:newContents, max_content_id:newId, mode:'READ', selected_content_id:newId}
  }
  return state;
}


export default configureStore({
  reducer: rootReducer,
  devTools: true
});