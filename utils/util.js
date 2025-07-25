const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}



export const USER_PAGE = {
  adminTabbarList  : [
    {
      "pagePath": "/pages/adm-manage/administrators",
      "text": "用户",
      "iconPath": "/pages/source/index.png",
      "selectedIconPath": "/pages/source/index-selected.png"
    },{
      "pagePath": "/pages/adm-my/adm-my",
      "text": "我的",
      "iconPath": "/pages/source/login.jpg",
      "selectedIconPath": "/pages/source/login-check.jpg"
    }
  ],
  memberTabbarList : [{
    "pagePath": "/pages/index/index",
    "text": "清单",
    "iconPath": "/pages/source/index.png",
    "selectedIconPath": "/pages/source/index-selected.png"
  },{
    "pagePath": "/pages/logs/logs",
    "text": "列表",
    "iconPath": "/pages/source/login.jpg",
    "selectedIconPath": "/pages/source/login-check.jpg"
  },{
    "pagePath": "/pages/my/login",
    "text": "我的",
    "iconPath": "/pages/source/login.jpg",
    "selectedIconPath": "/pages/source/login-check.jpg"
  }]
}