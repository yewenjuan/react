import React, { Component } from 'react';
import {connect} from "react-redux";
import {NavBar, List, InputItem,Grid,Icon} from "antd-mobile";
import {sendMsg} from "../../redux/actions"
const Item = List.Item

class Chat extends Component {  
  // 初始化数据
  state = {
    content: "",
    isShow: false
  }
  
  // 在第一次render之前初始化表情
  componentWillMount(){
    const enjoins = ["😀", "😃","😂","😀", "😃","😂","😀", "😃",
    "😂","😀", "😃","😂","😀", "😃","😂","😀",
     "😃","😂","😀", "😃","😂","😀", "😃","😂",
     "😀", "😃","😂","😀", "😃","😂","😀", "😃"];
    this.enjoins = enjoins.map((item) => ({text:item}))
  }
   // 刚进入页面的时候，聊天记录在最下面
   componentDidMount() {
     // 初始化显示
     window.scrollTo(0, document.body.scrollHeight);
   }
   // 更新列表显示聊天记录在下面
   componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
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
      content:"",
      isShow: false
    })
  }
  // 点击笑脸
  sendSmile = () => {
    let isShow = !this.state.isShow;
    
    this.setState({isShow});
    if(isShow) {
      setTimeout(() => {
        // 手动派发resize事件，用来解决列表显示的bug
        window.dispatchEvent(new Event("resize"));
      }, 0)
    }
  } 

  render() {
    let {user} = this.props;
    let {users, chatMsgs} = this.props.chat;
    // 获取聊天chatid
    let meId = user._id;
    // 第一次初始化的时候users为{}所以会报错，做个判断
    if(!users[meId]) {
      return null;
    }
    let targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join('_');
    let msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);
    // 得到目标用户的头像
    let targetHeader = users[targetId].header;
    let targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null;
    return (
      <div id="chat-page">
        <NavBar 
          icon={<Icon type="left"/>}
          className="sticky-header"           
          onLeftClick={() => this.props.history.go(-1)}
               
        >
          {users[targetId].username}
        </NavBar>
        <List style={{marginTop: 50, marginBottom: 50}}>
          {
            msgs.map(msg => {
              if(targetId === msg.from) {
                return (
                  <Item key={msg._id} thumb={targetIcon}>
                  {msg.content}
                </Item>
                )
              }else {
                return (
                  <Item key={msg._id} className="chat-me" extra='我'>
                    {msg.content}
                  </Item>
                )
              }
            })
          }         
        </List>
        <div className="am-tab-bar">
          <InputItem placeholder="请输入" extra={
            <span>
              <span onClick={this.sendSmile} style={{marginRight: 8}}>😀</span>
              <span onClick={this.send}>发送</span>
            </span>
          } value={this.state.content} onChange={val => this.setState({content: val})} onFocus={() => this.setState({isShow:false})}>
          </InputItem>
        </div>
        {
          this.state.isShow ? ( <Grid 
            data={this.enjoins}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={(item)=> {this.setState({content: this.state.content + item.text})}}
          />) : null
        }
       
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user,chat: state.chat}),
  {sendMsg}
)(Chat);