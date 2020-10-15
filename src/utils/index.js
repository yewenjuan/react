/**
 * 1、包含n个工具函数
 * 2、在用户点击注册或者登陆的时候进行判断
 * 3、用户信息是否完善，type有值并且header选择了，/laoban,/dashen去主界面
 * 4、用户信息不完善，type有值header没有选择 /laobaninfo,/dasheninfo
 */
export function getRedirectTo(type, header) {
  let path;
  if (type === "laoban") {
    path = "/laoban";
  } else {
    path = "/dashen";
  }
  if (!header) {
    path += "info";
  }
  return path;
}
