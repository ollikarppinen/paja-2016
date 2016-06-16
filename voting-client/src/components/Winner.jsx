import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');

export default class Winner extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>Winner is {this.props.winner}!</div>
    );
  }
}
