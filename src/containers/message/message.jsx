import React, { Component } from 'react';
import { connect } from "react-redux";
import {List,Badge} from "antd-mobile";
const Item = List.Item;
const Brief = Item.Brief;

// 对chatmsgs进行分组，根据chat_id进行分组
function getLastMsgs(chatMsgs) {
  // 用一个容器包含根据chat_Id进行的分组
  let lastMsgObjs = {};
  chatMsgs.forEach(msg => {
    // 得到聊天的标志id
    let chatid = msg.chat_id;
    // 获取已保存当前用户的lastmsg
    let lastMsg = lastMsgObjs[chatid];
    // 如果没有
    if(!lastMsg) { // 当前msg就是改分组的最后一个聊天记录
      lastMsgObjs[chatid] = msg;
    }else {
      // 如果msg比lastmsg晚，就将msg保存为lastmsg
      if(msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatid] = msg;
      }
    }
  })
  // 得到所有lastmsg的数组
  let lastMsgs = Object.values(lastMsgObjs);
  // 对得到的数组进行降序排序
  lastMsgs.sort(function(msg1, msg2) {
    return msg2.create_time - msg1.create_time
  });
  return lastMsgs;
}

 class Message extends Component {
  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;
    // 对chatmsgs进行分组，根据chat_id进行分组
    let lastMsgs = getLastMsgs(chatMsgs);
    return (
      <List style={{marginTop: 50,marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            // 获取目标用户id
            let targetUserId = msg.to === user._id ? msg.from : msg.to;
            // 获取目标用户
            let targetUser = users[targetUserId];
            return (
              <Item 
                key={msg._id}
                extra={<Badge text={0}/>}
                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                arrow="horizontal"
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                >
                  {msg.content}
                  <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }     
      </List>
    )
  }
}

export default connect(
  state => ({user:state.user,chat:state.chat}),
  {}
)(Message)
