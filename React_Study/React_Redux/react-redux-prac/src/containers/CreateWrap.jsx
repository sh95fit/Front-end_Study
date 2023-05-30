import Create from '../components/Create';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit:function(title, desc) {
      dispatch({type:"CREATE_PROCESS", title, desc});
    }
  }
}

export default connect(null, mapDispatchToProps)(Create);