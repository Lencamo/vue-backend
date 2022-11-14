const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  // name: state => state.user.name
  name: (state) => state.user.userInfoAll.email, // 返回用户名
  roles: (state) => state.user.userInfoAll.role // 返回角色信息
}
export default getters
