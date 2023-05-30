import React, { Component } from 'react'

export default class Update extends Component {
  state = {
    id:this.props.id,
    title:this.props.title,
    desc:this.props.desc
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
              Number(e.target.id.value),
              e.target.title.value,
              e.target.desc.value
            );
          }.bind(this)}>
          <input type="hidden" name="id" value={this.state.id}/>
          <p><input type="text" name="title" onChange={this.onChangeHandler.bind(this)} placeholder='title' value={this.state.title}/></p>
          <p><textarea type="text" name="desc" onChange={this.onChangeHandler.bind(this)} placeholder='description' value={this.state.desc}/></p>
          <p><input type="submit" /></p>
        </form>
      </div>
    )
  }
}