import axiosClient from "../axiosClient";
import URL from "./url";

class SpamService {
  getSpamList(body = {}) {
    const url = URL.GET_SPAM_LIST;
    return axiosClient.post(url, body);
  }
  addSpam(body = {}) {
    const url = URL.ADD_SPAM;
    return axiosClient.post(url, body);
  }
  deleteSpam(body = {}) {
    const url = URL.DELETE_SPAM;
    return axiosClient.post(url, body);
  }
}

export default new SpamService();
