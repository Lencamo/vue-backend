/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// /**
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

/**
 * 登录页邮箱格式验证
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  return /^([A-z0-9]{6,18})(\w|\-)+@[A-z0-9]+\.([A-z]{2,3})$/.test(email)
}

/**
 * 登录页密码格式验证
 * @param {string} pwd
 * @returns {Boolean}
 */
export function validPwd(pwd) {
  return /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(pwd)
}
