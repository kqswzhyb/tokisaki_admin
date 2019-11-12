const getters = {
  token: state => state.user.token,
  info: state => state.user.info,
  permission_routes: state => state.permission.routes
};
export default getters;
