import React, { Component } from 'react';
import {connect} from "react-redux";
import {NavBar, List, InputItem} from "antd-mobile";
import {sendMsg} from "../../redux/actions"
const Item = List.Item

class Chat extends Component {
  // 初始化数据
  state = {
    content: ""
  }
  // 发送消息
  send = () => {
    // 收集数据
    let from = this.props.user._id;
    let to = this.props.match.params.userid;
    let content = this.state.content.trim();
    if(content) {
      // 异步调用发送消息
      this.props.sendMsg({from, to, content})
    }
    // 消息发送完之后，清空输入框内容
    this.setState({
      content:""
    })
  }
  render() {
    return (
      <div id="chat-page">
        <NavBar>aa</NavBar>
        <List>
          <Item thumb={require('../../assets/images/头像1.png')}>
            你好
          </Item>
          <Item thumb={require('../../assets/images/头像2.png')}>
            你好
          </Item>
          <Item className="chat-me" extra='我'>
            很好
          </Item>
          <Item className="chat-me" extra='我'>
            很好
          </Item>
        </List>
        <div className="am-tab-bar">
          <InputItem placeholder="请输入" extra={
            <span onClick={this.send}>发送</span>
          } value={this.state.content} onChange={val => this.setState({content: val})}>
          </InputItem>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {sendMsg}
)(Chat);