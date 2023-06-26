import axiosClient from "../axiosClient";
import URL from "./url";

class TermService {
  getTermsList() {
    const url = URL.GET_TERM_LIST;
    return axiosClient.get(url);
  }
  getTermDetail(id) {
    const url = URL.GET_TERM_DETAIL + "/" + id;
    return axiosClient.get(url);
  }
  updateTerm(id, body = {}) {
    const url = URL.UPDATE_TERM + "/" + id;
    return axiosClient.put(url, body);
  }
}

export default new TermService();
