import request from '@/utils/request'

// 根据系统代码查询该系统所有菜单
export function getSysMenus(data) {
  return request({
    url: '/th-manager-biz/rolePowerManager/getSysMenus',
    method: 'post',
    data
  })
}
// 企业角色管理分页
export function selectRolePage(data) {
  return request({
    url: '/th-manager-biz/rolePowerManager/selectRolePage',
    method: 'post',
    data
  })
}
// 新增角色
export function addRole(data) {
  return request({
    url: '/th-manager-biz/rolePowerManager/addRole',
    method: 'post',
    data
  })
}
// 更新角色
export function updateRole(data) {
  return request({
    url: '/th-manager-biz/rolePowerManager/updateRole',
    method: 'post',
    data
  })
}
// 删除角色
export function delRole(data) {
  return request({
    url: '/th-manager-biz/rolePowerManager/delRole',
    method: 'post',
    data
  })
}
// 会员管理列表
export function getUsersPage(data) {
  return request({
    url: '/th-manager-biz/userManager/getUsersPage',
    method: 'post',
    data
  })
}

// 通过customer_id查询实名信息
export function getCompanyByCustomerId(data) {
  return request({
    url: '/th-manager-biz/userManager/getCompanyByCustomerId',
    method: 'post',
    data
  })
}
// 资讯管理分页
export function selectPageNotice(data) {
  return request({
    url: '/th-manager-biz/private-product/selectPageNotice',
    method: 'post',
    data
  })
}

// 上传
export function fileUpload(data) {
  return request({
    url: '/th-manager-biz/login/fileUpload',
    method: 'post',
    data
  })
}
// 新增资讯
export function addNotice(data) {
  return request({
    url: '/th-manager-biz/private-product/addNotice',
    method: 'post',
    data
  })
}

// 话单总览
export function selectAllCallLogPage(data) {
  return request({
    url: '/kl-call-boss-biz/call-out/selectAllCallLogPage',
    method: 'post',
    data
  })
}
// 忘记密码-验证账号，发送验证码
export function forgetToSend(data) {
  return request({
    url: '/kl-customer-biz/password/forgetToSend',
    method: 'post',
    data
  })
}
// 忘记密码-校验验证码，随机重置
export function forgetToUpdate(data) {
  return request({
    url: '/kl-customer-biz/password/forgetToUpdate',
    method: 'post',
    data
  })
}
export function selectLogAnalysis(data) {
  return request({
    url: '/kl-call-boss-biz/homePage/selectLogAnalysis',
    method: 'post',
    data
  })
}
