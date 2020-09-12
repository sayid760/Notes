
import React, { Component } from 'react'
import { Input, Button, List, Typography } from 'antd'
import 'antd/dist/antd.css';

import store from './store';
import { ACTIONS } from './store/command';
import { TodoListUI } from './ToduListUI';
import { getTodolist } from './store/actionCreates';

export class TodoListAnt extends Component {

    constructor(props) {
        super(props);
        console.log(store.getState());
        this.state = store.getState();
        store.subscribe(()=>{ this.setState(store.getState())})
    }

    render() {
        return (
            <TodoListUI 
                inputValue={this.state.inputValue}  
                list={this.state.list}
                handleClick={this.handleClick.bind(this,this.state.inputValue)}
                clickItem = {this.clickItem.bind(this)}
                handlerInputChange={this.handlerInputChange}
            />
        )
    }

    componentDidMount() {
        /**redux 从异步接口操作数据 */
        store.dispatch(getTodolist());
    }

    handlerInputChange = (e) => {
        const action = {
            type:ACTIONS.INPUT_CHANGE,
            value:e.target.value
        }
        store.dispatch(action);
    }

    clickItem = function(item) {
        console.log('....' + item);
        this.sendNotification(ACTIONS.DEL_TO_LiST,item);
    }

    handleClick(value) {
        console.log('....handleClick' + value);
        this.sendNotification(ACTIONS.ADD_TO_LiST,value);
    }

    sendNotification(type,value) {
        let action = {type:type,value:value};
        store && store.dispatch(action);
    }
}

