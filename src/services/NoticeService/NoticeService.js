import axiosClient from "../axiosClient";
import URL from "./url";

class NoticeService {
  getNoticeList(body = {}) {
    const url = URL.GET_NOTICE_LIST;
    return axiosClient.post(url, body);
  }
  getNoticeDetail(id) {
    const url = URL.GET_NOTICE_DETAIL + "/" + id;
    return axiosClient.get(url);
  }
  addNotice(body = {}) {
    const url = URL.ADD_NOTICE;
    return axiosClient.post(url, body);
  }
  modifyNotice(id, body = {}) {
    const url = URL.UPDATE_NOTICE + "/" + id;
    return axiosClient.put(url, body);
  }
  deleteNotice(body = []) {
    const url = URL.DELETE_NOTICE;
    return axiosClient.post(url, body);
  }
}

export default new NoticeService();
