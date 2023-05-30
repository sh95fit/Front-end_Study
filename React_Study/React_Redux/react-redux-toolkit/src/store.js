import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './counterSlice'

// const counterSlice = createSlice({
//   name: 'count',
//   initialState:{value:0},
//   reducers:{
//     up:(state, action)=>{
//       state.value = state.value + action.payload;
//     }
//   }
// });

const store = configureStore({
  reducer:{
    counter:counterSlice.reducer
  }
})

export default store;