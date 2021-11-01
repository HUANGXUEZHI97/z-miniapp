const dashboard = [
  'pages/dashboard/index'
]

const clue = [
  'pages/clue/index'
]

const client = [
  'pages/client/index'
]

const mine = [
  'pages/mine/index'
]

export default {
  pages: [
    ...dashboard,
    ...clue,
    ...client,
    ...mine
  ],
  tabBar: {
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    selectedColor:'#3a8fff',
    list: [
      {
        pagePath: '/pages/dashboard/index',
        iconPath: 'images/tabbar/icon_tabbar_dashboard_off.png',
        selectedIconPath: 'images/tabbar/icon_tabbar_dashboard_on.png',
        text: '仪表盘',
      },
      {
        pagePath: '/pages/clue/index',
        iconPath: 'images/tabbar/icon_tabbar_clue_off.png',
        selectedIconPath: 'images/tabbar/icon_tabbar_clue_on.png',
        text: '线索',
      },
      {
        pagePath: '/pages/client/index',
        iconPath: 'images/tabbar/icon_tabbar_client_off.png',
        selectedIconPath: 'images/tabbar/icon_tabbar_client_on.png',
        text: '客户',
      },
      // {
      //   pagePath: '/pages/tool/index',
      //   iconPath: 'images/tabbar/icon_tabbar_tool_off.png',
      //   selectedIconPath: 'images/tabbar/icon_tabbar_tool_on.png',
      //   text: '工具',
      // },
      {
        pagePath: '/pages/mine/index',
        iconPath: 'images/tabbar/icon_tabbar_mine_off.png',
        selectedIconPath: 'images/tabbar/icon_tabbar_mine_on.png',
        text: '我的',
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
