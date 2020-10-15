import React, { Component } from 'react'
import { connect } from "react-redux";

import UserList from "../../components/userlist/userlist";
import {getUserList} from "../../redux/actions"

 class Dashen extends Component {
  componentDidMount() {
    // 获取大神用户列表 发送ajax请求
    this.props.getUserList("dashen");
  }
 render() {
   return (
     <UserList userList={this.props.userList}/>
   )
 }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Dashen)
