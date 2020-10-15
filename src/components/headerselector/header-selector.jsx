import React, { Component } from "react";
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types";
import "./header.css";

export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.avatorList = [];
    for (let i = 0; i < 20; i++) {
      //初始化头像
      this.avatorList.push({
        text: `头像${i + 1}`,
        icon: require(`../../assets/images/头像${i + 1}.png`), // 这里用commonjs的语法去引入很合适
      });
    }
  }
  state = {
    icon: null, // 初始化头像，默认是对象
  };
  // 点击选中头像
  handleHeader = ({ text, icon }) => {
    // 已选头像路径 显示头像
    this.setState({
      icon,
    });
    // 已选头像名称
    this.props.setHeader(text);
  };
  render() {
    let { icon } = this.state;
    const headerList = !icon ? (
      "请选择头像"
    ) : (
      <div>
        已选头像:
        <img src={icon} alt="" className="head-img" />
      </div>
    );
    return (
      <List renderHeader={() => headerList}>
        <Grid
          data={this.avatorList}
          columnNum={5}
          onClick={this.handleHeader}
        ></Grid>
      </List>
    );
  }
}
