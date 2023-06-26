import axiosClient from "../axiosClient";
import URL from "./url";

class MemberService {
  getInquiryHome() {
    const url = URL.GET_INQUIRY_HOME;
    return axiosClient.post(url);
  }
  getAdminHomeLog(body = {}) {
    const url = URL.GET_ADMIN_HOME_LOG;
    return axiosClient.post(url, body);
  }
  getAdminHomeDetail() {
    const url = URL.GET_ADMIN_HOME_DETAIL;
    return axiosClient.post(url);
  }
  homeSearch(body = {}) {
    const url = URL.HOME_SEARCH;
    return axiosClient.post(url, body);
  }
  getAdminDetailHome(id) {
    const url = URL.GET_HOME_DETAIL + "/" + id;
    return axiosClient.get(url);
  }
}

export default new MemberService();
