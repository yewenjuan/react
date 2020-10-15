import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  NavBar,
  WhiteSpace,
  List,
  InputItem,
  WingBlank,
  Radio,
  Button,
} from "antd-mobile";
import "./register.css";
import Logo from "../../components/logo/logo.jsx";
import { register } from "../../redux/actions";
const ListItem = List.Item;

class Register extends Component {
  state = {
    username: "", // 用户名
    password: "", // 密码
    password2: "", // 确定密码
    type: "dashen",
  };
  // 获取表单数据
  handleChange(name, val) {
    this.setState({
      [name]: val, // [name]是为了让name变成变量这样才能改变对应的状态值
    });
  }
  // 处理注册点击事件
  register = () => {
    // axios
    //   .get("/api/register.json")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(this.state);

    // 调用异步redux
    this.props.register(this.state);
  };
  // 去登陆
  toLogin = () => {
    this.props.history.push("/login");
  };
  render() {
    const radioData = [
      { value: "dashen", label: "大神" },
      { value: "laoban", label: "老板" },
    ];
    let { type } = this.state;
    let { msg, redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>;
    }
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <List>
          {msg ? <div className="error-msg">{msg}</div> : null}
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
          <InputItem
            type="password"
            placeholder="请输入确认密码"
            onChange={(val) => this.handleChange("password2", val)}
          >
            确认密码:
          </InputItem>
          <WhiteSpace></WhiteSpace>
          <ListItem>
            <span>用户类型:</span>&nbsp;&nbsp;
            {radioData.map((radio) => (
              <Radio
                key={radio.value}
                checked={type === radio.value}
                onChange={() => this.handleChange("type", radio.value)}
              >
                {radio.label}&nbsp;&nbsp;&nbsp;
              </Radio>
            ))}
          </ListItem>
          <WhiteSpace></WhiteSpace>
          <WingBlank>
            <Button type="primary" onClick={this.register}>
              注&nbsp;&nbsp;&nbsp;册
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={this.toLogin}>已有账户</Button>
          </WingBlank>
        </List>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { register })(
  Register
);
