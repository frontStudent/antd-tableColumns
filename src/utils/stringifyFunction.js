// 自定义转换函数，将函数转换为字符串表示形式
export default (key, value) => {
  if (typeof value === "function") {
    return value.toString();
  }
  return value;
};
