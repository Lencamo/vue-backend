const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  // name: state => state.user.name
  name: (state) => state.user.userInfoAll.studentId // 返回用户名
}
export default getters
