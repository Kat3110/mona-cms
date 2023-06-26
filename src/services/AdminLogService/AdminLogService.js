import axiosClient from "../axiosClient";
import URL from "./url";

class AdminLogService {
  getAdminLog(body = {}) {
    const url = URL.GET_ADMIN_LOG;
    return axiosClient.post(url, body);
  }
  getAccessLog(body = {}) {
    const url = URL.GET_ACCESS_LOG;
    return axiosClient.post(url, body);
  }
  getQueryInforLog(body = {}) {
    const url = URL.GET_QUERY_INFO_LOG;
    return axiosClient.post(url, body);
  }
  checkDownloadRight(body){
    const url = URL.CHECK_DOWNLOAD_RIGHT;
    return axiosClient.post(url, body);
  }
}

export default new AdminLogService();
