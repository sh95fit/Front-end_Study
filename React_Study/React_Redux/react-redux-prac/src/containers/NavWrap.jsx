import Nav from '../components/Nav'
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {data:state.contents}
}

function mapDispatchToProps(dispatch) {
  return {
    onClick:function(id) {
      dispatch({type:'READ', id:id});
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);