import axiosClient from "../axiosClient";
import URL from "./url";

class FqaService {
  getFaqList(category = "") {
    const url = URL.GET_FQA_LIST + category;
    return axiosClient.get(url);
  }
  getDetailFQA(id) {
    const url = URL.GET_DETAIL_FQA + "/" + id;
    return axiosClient.get(url);
  }
  updateFQA(id, body = {}) {
    const url = URL.UPDATE_FQA + "/" + id;
    return axiosClient.put(url, body);
  }
  addFQA(body = {}) {
    const url = URL.ADD_FQA;
    return axiosClient.post(url, body);
  }
}

export default new FqaService();
