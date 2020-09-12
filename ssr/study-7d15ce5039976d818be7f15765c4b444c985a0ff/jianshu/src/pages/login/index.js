import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { login } from './store/actionCreators';
class Login extends PureComponent {
    render() {
        let { loginStatus, code, error } = this.props;
        if (!loginStatus) {
            return (
                <div>
                    <LoginWrapper>
                        <LoginBox>
                            <Input placeholder='账号' innerRef={(input) => { this.account = input }} />
                            <Input placeholder='密码' type='password' innerRef={(input) => { this.password = input }} />
                            <Button onClick={() => this.props.login(this.account, this.password)}>登陆</Button>
                        </LoginBox>
                    </LoginWrapper>
                </div>
            )
        }
        else {
            return <Redirect to="/"></Redirect>
        }
    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
    login(accountElem, passwordElem) {
        dispatch(login(accountElem.value, passwordElem.value))
    }
})

export default connect(mapState, mapDispatch)(Login);