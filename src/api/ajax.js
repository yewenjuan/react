// 封装ajax请求的函数封装
// 函数返回值是promise对象
import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
  if (type === "GET") {
    // 处理get请求携带参数拼接
    let paramStr = "";
    // 从data上取得key 并获得key值
    Object.keys(data).forEach((key) => {
      paramStr += key + "=" + data[key] + "&";
    });
    if (paramStr) {
      paramStr = paramStr.substring(0, paramStr.length - 1);
    }
    return axios.get(url + "?" + paramStr);
  } else {
    return axios.post(url, data);
  }
}
