import axiosClient from "../axiosClient";
import URL from "./url";

class LoginService {
  login(body = {}) {
    const url = URL.LOGIN_IN;
    return axiosClient.post(url, body);
  }
}

export default new LoginService();
