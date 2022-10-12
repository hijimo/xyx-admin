import _isObject from 'lodash/isObject';

export function get(key) {
  try {
    return localStorage.getItem(key) || null;
  } catch (ex) {
    return localStorage.getItem(key);
  }
}

export function set(key, value) {
  const v = _isObject(value) ? JSON.stringify(value) : value;

  return localStorage.setItem(key, v);
}

//  用户账号

export function setUserAccount(token: string) {
  return set('__user_login_account', token);
}
export function getUserAccount() {
  return get('__user_login_account');
}

// w登录凭证

export function setToken(token: string) {
  return set('__user_login_token', token);
}
export function getToken() {
  return get('__user_login_token');
}
// 登录信息
export function setUserInfo(user: any) {
  return set('__user_info', user);
}
export function getUserInfo() {
  try {
    return JSON.parse(get('__user_info'));
  } catch {
    return null;
  }
}
