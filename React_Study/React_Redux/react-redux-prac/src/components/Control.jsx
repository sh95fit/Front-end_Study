import React, { Component } from 'react'


export default class Control extends Component {
  render() {
    return (
      <ul>
        <li>
          <a href="create" onClick={function(e){
          e.preventDefault();
          this.props.onClick('CREATE');
          }.bind(this)}>Create</a>
        </li>

        <li>
          <a href="update" onClick={function(e){
          e.preventDefault();
          this.props.onClick('UPDATE');
          }.bind(this)}>Update</a>
        </li>

        <li>
          <input type="button" value="Delete" onClick={function(e){
            e.preventDefault();
            this.props.onClick('DELETE_PROCESS');
          }.bind(this)}></input>
        </li>
      </ul>
    )
  }
}