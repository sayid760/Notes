import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li
        onClick={this.handlerItemDelete.bind(this, this.props.ind)}
        dangerouslySetInnerHTML={{ __html: this.props.content }}>
      </li>
    )
  }
  handlerItemDelete = function (index) {
    this.props.deleteItem(index);
  }
}

/** 属性做校验 */
TodoItem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  deleteItem: PropTypes.func,
  ind: PropTypes.number
}

TodoItem.defaultProps = {
  test: 'hello world'
}