import React, { Component } from 'react'
import { connect } from "react-redux";
import {Result, WhiteSpace, List, Button, Modal} from "antd-mobile";
import Cookies from "js-cookie";

import {resetUser} from "../../redux/actions"

const Item = List.Item;
const Brief = Item.Brief;

 class Personal extends Component {   
   // 退出登录
   quitLogin = () => {
     Modal.alert("退出", "确定退出登录", [
       {
         text: "取消"
       },
       {
         text: "确定",
         onPress: () => {
          //  1、删除浏览器里的cookie
          Cookies.remove("userid")
          //  2、 删除redux里的用户信息
          this.props.resetUser();
         }
       }
     ])
   }
  render() {
    let {username, info, company, salary, header, post} = this.props.user;
    return (
      <div style={{marginBottom: 50,marginTop: 45}}>
        <Result 
        img={<img src={require(`../../assets/images/${header}.png`)} style={{width:80}} alt="header"/>}
        title={username}
        message={company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>信息: {info}</Brief>
            {
              salary ? <Brief>薪资: {salary}</Brief> : null
            }            
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type="warning" onClick={this.quitLogin}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)
