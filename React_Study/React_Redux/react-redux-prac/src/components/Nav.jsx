import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    // debugger;
    var tags = [];
    for(var i=0; i<this.props.data.length; i++){
      var d = this.props.data[i];
      tags.push(<li key={d.id}><a href="#page" data-id={d.id} onClick={function(e){
        this.props.onClick(Number(e.target.dataset.id));
      }.bind(this)}>{d.title}</a></li>)
    }

    return (
      <div>
        <nav>
          <ol>
            {tags}
          </ol>
        </nav>
      </div>
    )
  }
}