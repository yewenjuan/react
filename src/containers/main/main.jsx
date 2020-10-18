import React, { Component } from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import {connect} from "react-redux";
import Cookie from "js-cookie"
import {NavBar} from "antd-mobile"

import LaobanInfo from "../laobaninfo/laoban-info.jsx";
import Laoban from "../laoban/laoban";
import DashenInfo from "../dasheninfo/dashen-info.jsx";
import Personal from "../personal/personal";
import Dashen from "../dashen/dashen";
import Message from "../message/message";
import Error from "../../components/error/error"
import NavFooter from "../../components/navfooter/nav-footer"
import Chat from "../../containers/chat/chat"

import {getRedirectTo} from "../../utils";
import {getUserInfo} from "../../redux/actions"

class Main extends Component {

  // 组件对象上添加属性
  navList = [
    {
      path: "/laoban",
      component: Laoban,
      title: "大神列表",
      icon:"dashen",
      text: "大神"
    },
    {
      path: "/dashen",
      component: Dashen,
      title: "老板列表",
      icon:"laoban",
      text: "老板"
    },
    {
      path: "/message",
      component: Message,
      title: "消息列表",
      icon:"message",
      text: "消息"
    },
    {
      path: "/personal",
      component: Personal,
      title: "个人中心",
      icon:"personal",
      text: "个人"
    }
  ]

  componentDidMount() {
    // 如果浏览器里有cookie，但是没有登陆 redux没有_id
    const userid = Cookie.get("userid");
    const {_id} = this.props.user;
    if(userid && !_id) {
      // 发送请求
      // console.log("发送ajax请求");
      this.props.getUserInfo();
    }
  }
  render() {
    // 如果浏览器cookie中有userid
    const userid = Cookie.get("userid");
    // 如果不存在userid跳转到登陆页
    if(!userid) {
      return <Redirect to="/login" />
    }
    let { user,unReadCount } = this.props;
    // 如果没有_id,为什么返回null，后台数据库返回的是null，保持一致
    if(!user._id) {
      return null;
    }else {
      let {pathname} = this.props.location;
      if(pathname === "/") {
       pathname = getRedirectTo(user.type,user.header);
       return <Redirect to={pathname} />
      }
    }
    let path = this.props.location.pathname;
    let {navList} = this;
    let currentNav = navList.find((nav) => path === nav.path);
    // 因为大神和老板下面的导航内容显示不一样，所以给数组增加标识
    if(currentNav) {
      if(user.type === "laoban") {
        navList[1].hide = true
      }else {
        navList[0].hide = true
      }
  
    }
    return (      
      <div>
        {/* 如果当前请求的路径和我数组里的相同 显示头部 */}
        {
          currentNav ? <NavBar className="sticky-header">{currentNav.title}</NavBar> : null
        }
        <Switch>
          {
            navList.map((nav, index) => <Route key={index} path={nav.path} component={nav.component}></Route>)
          }
          <Route path="/laobaninfo" component={LaobanInfo}></Route>
          <Route path="/dasheninfo" component={DashenInfo}></Route>
          <Route path="/chat/:userid" component={Chat}></Route>
          <Route component={Error}></Route>
        </Switch>
        {/* 底部固定导航 */}
        {
          currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null
        }
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUserInfo}
)(Main);
