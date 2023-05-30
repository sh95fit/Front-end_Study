import React, { Component } from 'react';

export default class Article extends Component {
  render() {
    return (
      <div>
        <nav>
          <article>
            <h2>{this.props.title}</h2>
            {this.props.desc}
          </article>
        </nav>
      </div>
    )
  }
}