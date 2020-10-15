import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, InputItem, TextareaItem, NavBar, List } from "antd-mobile";
import HeaderSelector from "../../components/headerselector/header-selector.jsx";
import {update} from "../../redux/actions"

class DashenInfo extends Component {
  state = {
    header: "", // 头像名称
    post: "", // 职位
    info: "",
  };
  // 点击保存 更新数据
  save = () => {
   this.props.update(this.state);
  };
  // 收集输入框的内容
  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  // 因为头像在父组件里，所以状态更新应该在父组件，子组件传来值
  setHeader = (header) => {
    this.setState({ header });
  };
  render() {
    const {header,type} = this.props.user;
    if(header) {
      let path = type === 'dashen' ? "/dashen" : "/laoban";
      return <Redirect to={path}/>
    }
    return ( 
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <List>
          <InputItem
            placeholder="请输入求职岗位"
            onChange={(val) => this.handleChange("post", val)}
          >
            求职岗位:
          </InputItem>
          <TextareaItem
            title="个人介绍:"
            rows={3}
            onChange={(val) => this.handleChange("info", val)}
          ></TextareaItem>
          <Button type="primary" onClick={this.save}>
            保存
          </Button>
        </List>
      </div>
    );
  }
}

export default connect((state) => ({ user:state.user }), { update })(DashenInfo);
