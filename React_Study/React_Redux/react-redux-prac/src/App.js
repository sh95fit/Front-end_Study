import React, { Component} from 'react';
import './App.css';
import Header from './components/Header'
import Nav from './containers/NavWrap'
import Read from './containers/ReadWrap'
import Control from './containers/ControlWrap'
import Create from './containers/CreateWrap'
import { connect } from 'react-redux';
import Update from './containers/UpdateWrap'

class App extends Component {
  render() {
    var article = null;
    if(this.props.mode === 'READ') {
      article = <Read />
    } else if(this.props.mode === 'CREATE') {
      article = <Create />
    } else if(this.props.mode === 'WELCOME') {
      article = <Read />
    } else if(this.props.mode === 'UPDATE') {
      article = <Update />
    }
    return (
        <div className="App">
          <Header />
          <Nav />
          <Control />
          { article }
        </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    mode:state.mode
  }
}

export default connect(mapStateToProps)(App);
