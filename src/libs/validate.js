/**
 * 密码格式验证
 * @param rule 验证规则（不少于6位）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不得小于6位'));
  } else {
    callback();
  }
};

/**
 * 手机号码格式验证
 * @param rule 验证规则
 * @param value 需要验证的值
 * @param callback 回调函数
 */
const validateMobile = (rule, value, callback) => {
  const reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  if (!reg.test(value)) {
    callback(new Error('手机号格式错误'));
  } else {
    callback();
  }
};

/**
 * 身份证号码格式验证
 * @param rule 验证规则（是否满足18位）
 * @param value 需要验证的值
 * @param callback 回调函数
 */
const validateIDCard = (rule, value, callback) => {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!reg.test(value)) {
    callback(new Error('身份证号码格式错误'));
  } else {
    callback();
  }
};

export { validatePassword, validateMobile, validateIDCard };