import React, { Component } from 'react';
import { DetailWapper, Header } from './style';

export class Detail extends Component {
    constructor(props) {
        super(props) 
    }

    render() {
        return (
            <div>
                <DetailWapper>
                    <Header>
                        <h1>甩了黄晓明，嫁最不正经男人，她结婚6年再拍婚纱照竟是因为…</h1>
                    </Header>
                </DetailWapper>
            </div>
        )
    }
}