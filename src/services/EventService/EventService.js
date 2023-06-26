import axiosClient from "../axiosClient";
import URL from "./url";

class EventService {
  getEventList(body = {}) {
    const url = URL.GET_EVENT_LIST;
    return axiosClient.post(url, body);
  }
  getEventDetail(id) {
    const url = URL.GET_EVENT_LIST + "/" + id;
    return axiosClient.get(url);
  }
  addEvent(body = {}) {
    const url = URL.ADD_EVENT;
    return axiosClient.post(url, body);
  }
  modifyEvent(id, body = {}) {
    const url = URL.UPDATE_EVENT + "/" + id;
    return axiosClient.put(url, body);
  }
  deleteEvent(body = []) {
    const url = URL.DELETE_EVENT;
    return axiosClient.post(url, body);
  }
}

export default new EventService();
