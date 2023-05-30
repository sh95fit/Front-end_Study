import React, { Component } from 'react';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ol>
            <li><a href="html.html">HTML</a></li>
            <li><a href="css.html">CSS</a></li>
            <li><a href="js.html">JavaScript</a></li>
          </ol>
        </nav>
      </div>
    )
  }
}