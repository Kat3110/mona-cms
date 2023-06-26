import axiosClient from "../axiosClient";
import URL from "./url";

class InquiryService {
  getInquiryList(body = {}) {
    const url = URL.GET_INQUIRY_LIST;
    return axiosClient.post(url, body);
    // return axiosClient.get(url);
  }
  getDetailInquiry(id) {
    const url = URL.GET_INQUIRY_LIST + "/" + id;
    return axiosClient.get(url);
  }
  updateInquiry(id, body = {}) {
    const url = URL.UPDATE_INQUIRY + "/" + id;
    return axiosClient.put(url, body);
  }
}

export default new InquiryService();
