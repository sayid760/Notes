import React, { Component, Fragment } from 'react';

import './style.css'
import { TodoItem } from './TodoItem';

/**
 * react 事件操作基础
 */

export class Todolist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "hello !!!!",
      list: [
        'lean english',
        'lean react',
      ]
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          {/* 这是一个input */}
          {/* 这个一个niput 我要多行 */}

          <label htmlFor="insertArea">输入内容</label>

          <input
            ref = {(input)=>{this.input = input}}
            className="input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button
            onClick={this.handlerButtonClick}
          >提交</button>
        </div>
        <ul ref={(ul)=>{this.ul = ul}}>
          {
            this.state.list.map((item, index) => {
              return (
                <TodoItem 
                  key={index} 
                  ind={index} 
                  content={item}
                  deleteItem = {this.handlerItemDelete.bind(this)}
                />
              )
            })
          }
        </ul>
      </Fragment>
    )
  }

  handlerItemDelete = function (index) {
    this.setState((pareState)=>{
      let ls = [...pareState.list];
      ls.splice(index, 1);
      return { list:ls }
    })
  }

  handlerButtonClick = (e) => {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    },()=>{
      console.log(this.ul.querySelectorAll("li").length);
    })
  }

  handleInputChange = (e) => {
    let value = e.target.value;
    this.setState((prevState)=>({
      inputValue: value
    }))
  }
}