import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Logo from "../../components/logo/logo.jsx";
import { getRedirectTo } from "../../utils"
import {login} from "../../redux/actions";
import {
  NavBar,
  WhiteSpace,
  List,
  InputItem,
  WingBlank,
  Button,
} from "antd-mobile";
import "../register/register.css";

class Login extends Component {
  state = {
    username: "", // 用户名
    password: "", // 密码
  };
  // 获取表单数据
  handleChange(name, val) {
    this.setState({
      [name]: val, // [name]是为了让name变成变量这样才能改变对应的状态值
    });
  }
  // 登陆
  login = () => {
    this.props.login(this.state);
  };
  // 去注册
  toRegister = () => {
    this.props.history.push("/register");
  };
  render() {
    const {header,type,_id} = this.props.user;
    if(_id) {
      let path = getRedirectTo(type, header);
      return <Redirect to={ path }/>
    }
    
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <List>
          <WhiteSpace></WhiteSpace>
          <InputItem
            placeholder="请输入用户名"
            onChange={(val) => this.handleChange("username", val)}
          >
            用户名:
          </InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type="password"
            placeholder="请输入密码"
            onChange={(val) => this.handleChange("password", val)}
          >
            密&nbsp;&nbsp;&nbsp;码:
          </InputItem>
          <WhiteSpace></WhiteSpace>
          <WingBlank>
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;陆
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={this.toRegister}>还没有账户</Button>
          </WingBlank>
        </List>
      </div>
    );
  }
}

export default connect(state => ({user: state.user}), {login})(Login);
