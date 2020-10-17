// 包含n个action creator
// 异步action和同步action 如果是同步的返回对象 如果是异步的返回函数
import { reqRegister, reqLogin,reqUpdate, reqUser,reqUserList,reqChatMsgList,reqReadMsg } from "../api/index.js";
import { AUTH_SUCCESS, ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST, RECEIVE_CHAT_LIST, RECEIVE_CHAT} from "./action-types";
import io from "socket.io-client";

// 成功的同步分发
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
// 失败的分发 错误的提示
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
// 更新用户数据
const updateUser = (user) => ({type:RECEIVE_USER,data:user});
// 重置用户
export const resetUser = (msg) => ({type:RESET_USER,data:msg});
// 获取用户信息列表（同步）
const userList = (userList) => ({type: RECEIVE_USER_LIST, data: userList});
// 获取所有聊天列表
const receiveChatList = ({users, chatMsgs}) => ({type: RECEIVE_CHAT_LIST,data: {users, chatMsgs} });
// 接受一个消息的同步action
const receiveMsg = (chatMsg) => ({type:RECEIVE_CHAT, data: chatMsg})

// 注册成功
export const register = (user) => {
  let { username, password, password2, type } = user;
  // 表单前台验证，如果不通过分发一个同步errorMsg
  if (!username) {
    return errorMsg("用户名不能为空");
  }
  if (password !== password2) {
    return errorMsg("两次密码输入不一致");
  }
  // 经过上面的条件判断，说明表单输入合法，此时发送异步的action
  return async (dispatch) => {
    // 提交注册调用接口
    const response = await reqRegister({ username, password, type });
    const result = response.data; // 得到的是{code:1/0,data:'',msg:''}
    // 成功的注册
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      // 此时需要分发
      dispatch(authSuccess(result.data));
    } else {
      // 失败的注册
      dispatch(errorMsg(result.msg));
    }
  };
};

// 登陆
export const login = (user) => {
  let { username, password } = user;
  // 表单前台验证，如果不通过分发一个同步errorMsg
  if (!username) {
    return errorMsg("用户名不能为空");
  }
  if (!password) {
    return errorMsg("密码不能为空");
  }
  // 经过上面的条件判断，说明表单输入合法，此时发送异步的action
  return async (dispatch) => {
    // 调用登陆接口
    const response = await reqLogin({ username, password });
    const result = response.data;
    // 成功的登陆
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      // 此时需要分发
      dispatch(authSuccess(result.data));
    } else {
      // 失败的登陆
      dispatch(errorMsg(result.msg));
    }
  };
};

// 更新
export const update = (user) => {
  // 异步返回函数
  return async dispatch => {
    // 调用接口 await期望得到的是结果 如果不这样写 得到的是一个promise对象
   const response = await reqUpdate(user);
   const result = response.data;
   console.log(result);
   // 更新成功
   if(result.code === 0) {
    dispatch(updateUser(result.data))
   }else { // 更新失败
    dispatch(resetUser(result.msg))
   }
  }
}

// 获取用户信息
export const getUserInfo = () => {
  return async dispatch => {
    let response = await reqUser();
    let result = response.data;
    if(result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(updateUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}

// 根据不同用户类型获取不同用户列表信息
export const getUserList = (type) => {  
  // 异步调用ajax请求
  return async dispatch => {
    const response = await reqUserList(type);
    const result = response.data;
    if(result.code === 0) {     
      // 分发同步action
      dispatch(userList(result.data))
    }
  }  
}

// 实时通信初始化io 
function initIO (dispatch, userid) {
  // io连接服务器只需要一次
  if(!io.socket) {
    io.socket = io("ws://localhost:4000");
    // 绑定receiveMsg监听 得到服务器端发送过来的消息
    io.socket.on("receiveMsg", function(chatMsg) {
      console.log("浏览器接受到的消息" + chatMsg);  
      // 当有一个与之有关联的聊天
      if(userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg))
      }      
    })
  }
}
// 异步获取用户聊天数据
async function getMsgList(dispatch, userid) {
  // 用户登录初始化io，不能在点击发送按钮的时候初始化，时机不对
  initIO (dispatch, userid);
  // 请求聊天接口
 let response = await reqChatMsgList();
 let result = response.data;
//  成功
  if(result.code === 0) {
    // 分发同步action
    const {users, chatMsgs} = result.data;
    dispatch(receiveChatList({users, chatMsgs}));
  }

}
// 异步调用发送消息
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    // console.log("发送消息",{from, to, content});
    
    // 发送消息
    io.socket.emit("sendMsg", {from, to, content})
  }
}

