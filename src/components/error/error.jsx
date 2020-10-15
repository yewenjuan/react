import React, { Component } from 'react'
import {Button} from "antd-mobile"

export default class Error extends Component {
  handleClick = () => {
    this.props.history.replace("/")
  }
  render() {
    return (
      <div>
        <h2>抱歉,找不到该页面</h2>
        <Button type="primary" onClick={this.handleClick}>返回首页</Button>
      </div>
    )
  }
}


