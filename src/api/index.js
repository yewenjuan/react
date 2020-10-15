// 包含n个对外暴露的接口函数的模块
// 返回promise
import ajax from "./ajax.js";

// 注册接口
export const reqRegister = (user) => ajax("/register", user, "POST");

//登陆接口
export const reqLogin = ({ username, password }) =>
  ajax("/login", { username, password }, "POST");

// 更新用户接口
export const reqUpdate = (user) => ajax("/update", user, "POST");

// 获取用户信息接口
export const reqUser = () => ajax("/user");

// 获取用户列表
export const reqUserList = (type) => ajax("/userlist",{type})

// 获取用户消息列表
export const reqChatMsgList = () => ajax("/msglist")

// 将未读消息变成已读消息
export const reqReadMsg = (from) => ajax("/readmsg",{from},'POST')
