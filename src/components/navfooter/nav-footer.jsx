import React, { Component } from 'react';
import {TabBar} from "antd-mobile"
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom"

import "./footer.css"

const Item = TabBar.Item;

// 希望在非路由组件访问路由库的api

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {
    let {navList} = this.props;
    const {pathname} = this.props.location;
    navList =  navList.filter(nav => !nav.hide)
    return (
      <TabBar>
        {
          navList.map((nav) => (
            <Item key={nav.path} title={nav.text} icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={nav.path===pathname}
            onPress={() => this.props.history.push(nav.path)}></Item>
          ))
        }
        
      </TabBar>
    );
  }
}

export default withRouter(NavFooter); // 包装非路由组件