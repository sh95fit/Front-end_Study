import Update from '../components/Update';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  var id, title, desc;
  for(var i=0; i<state.contents.length; i++){
    var d = state.contents[i];
    if(d.id === state.selected_content_id) {
      id = d.id;
      title = d.title;
      desc = d.desc;
      break;
    }
  }

  return {
    id,
    title,
    desc
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit:function(id, title, desc){
      dispatch({type:"UPDATE_PROCESS", id, title, desc})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Update);