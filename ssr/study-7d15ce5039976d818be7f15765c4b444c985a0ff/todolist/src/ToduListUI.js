import React, { Component } from 'react'
import { Input, Button, List, Typography } from 'antd'
import 'antd/dist/antd.css';

/**无状态组件 */
export const TodoListUI = (props)=> {
    return (
        <div style={{ margin: '10px' }}>
            <Input placeholder="todo info" onChange={props.handlerInputChange} style={{ width: '300px' }} value={props.inputValue}></Input>
            <Button type='parimary' onClick={() => (props.handleClick())}>提交</Button>
            <List style={{ width: "370px" }}
                bordered
                dataSource={props.list}
                renderItem={item => (
                    <List.Item onClick={() => (props.clickItem(item))}>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            ></List>
        </div>
    )
}

/**普通组件 */
// export class TodoListUI extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div style={{ margin: '10px' }}>
//                 <Input placeholder="todo info" onChange={this.props.handlerInputChange} style={{ width: '300px' }} value={this.props.inputValue}></Input>
//                 <Button type='parimary' onClick={() => (this.props.handleClick())}>提交</Button>
//                 <List style={{ width: "370px" }}
//                     bordered
//                     dataSource={this.props.list}
//                     renderItem={item => (
//                         <List.Item onClick={() => (this.props.clickItem(item))}>
//                             <Typography.Text mark>[ITEM]</Typography.Text> {item}
//                         </List.Item>
//                     )}
//                 ></List>
//             </div>
//         )
//     }
// }