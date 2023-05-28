import AddNumber from "../components/AddNumber";
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        onClick:function(status, size){
            dispatch({type:status, size:size})
        }
    }
}

export default connect(null, mapDispatchToProps)(AddNumber);





// import AddNumber from "../components/AddNumber";
// import React, { Component } from 'react';
// import store from "../store"

// export default class extends Component {
//     render() {
//         return <AddNumber onClick={function(status, size){
//             store.dispatch({type:status, size:size});
//         }.bind(this)}/>
//     }
// }