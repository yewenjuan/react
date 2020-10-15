// 包含多个reducer函数 用来接收老的state和action 返回新的state
import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_CHAT_LIST,RECEIVE_CHAT} from "./action-types";
import { getRedirectTo } from "../utils/index.js";

// 用来管理用户
const initUser = {
  username: "", // 用户名
  type: "", // 用户类型
  msg: "", // 错误提示信息
};
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data是user
      let { type, header } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(type, header) };
    case ERROR_MSG: // data是user
      return { ...state, msg: action.data };
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {...initUser,msg: action.data};
    default:
      return state;
  }
}

// 获取用户信息列表
const initUserList = [];

function userList(state=initUserList, action) {
  switch(action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state
  }
}

// 聊天消息列表
const initChat = {
  users: {},
  chatMsgs: []
}

function chat(state=initChat, action) {
  switch(action.type) {
    case RECEIVE_CHAT_LIST:
      return action.data.users
    case RECEIVE_CHAT:
      return action.data.chatMsgs
    default:
    return state
  }
}
export default combineReducers({
  user,
  userList,
  chat
});

// 最终向外暴露的结构 {xx:0,yy:0....}