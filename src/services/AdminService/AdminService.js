import axiosClient from "../axiosClient";
import URL from "./url";

class AdminService {
  getAdmin() {
    const url = URL.GET_ADMIN;
    return axiosClient.get(url);
  }
  getDetailAdmin(id) {
    const url = URL.GET_ADMIN + id;
    return axiosClient.get(url);
  }
  updateAdmin(id, body = {}) {
    const url = URL.PUT_ADMIN + "/" + id;
    return axiosClient.put(url, body);
  }
  createAdmin(body = {}) {
    const url = URL.CREATE_ADMIN;
    return axiosClient.post(url, body);
  }
  deleteAdmin(stringId = "") {
    const url = URL.DELETE_ADMIN + "/" + stringId;
    return axiosClient.post(url);
  }
  changePassword(body = {}) {
    const url = URL.CHANGE_PASSWORD;
    return axiosClient.put(url, body);
  }
  getAccessMenuList(level) {
    const url = URL.GET_ACCESS_MENU + "/" + level;
    return axiosClient.get(url);
  }
  modifyAccess(body, level) {
    const url = URL.UPDATE_ACCESS_MENU + "/" + level;
    return axiosClient.put(url, body);
  }
  checkAccess(value) {
    const url = URL.CHECK_ACCESS + "/" + value;
    return axiosClient.get(url);
  }
  addAccess(body = {}) {
    const url = URL.ADD_ACCESS;
    return axiosClient.post(url, body);
  }
  initPassword(id) {
    const url = URL.INIT_PASSWORD + "/" + id;
    return axiosClient.put(url);
  }
  checkAdminId(id) {
    const url = URL.CHECK_ADMIN + "/" + id;
    return axiosClient.get(url);
  }
}

export default new AdminService();
