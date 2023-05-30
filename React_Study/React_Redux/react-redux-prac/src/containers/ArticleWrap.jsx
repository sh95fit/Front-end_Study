import Article from "../components/Article";
import { connect } from 'react-redux';


function mapStateToProps(state) {
  var title, desc;
  if(state.mode === 'WELCOME') {
    title = state.welcome_content.title;
    desc = state.welcome_content.desc;
  } else {
      for(var i=0; i<state.contents.length; i++){
        var d = state.contents[i];
        if(d.id === state.selected_content_id) {
          title = d.title;
          desc = d.desc;
          break;
        }
      }
  }
  return {
    title:title,
    desc:desc
  }
}

export default connect(mapStateToProps)(Article);