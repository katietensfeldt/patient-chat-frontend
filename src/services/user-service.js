import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getPartners() {
    return axios.get(window.API_URL + "/users", { headers: authHeader() });
  }

  getUserConversations() {
    return axios.get(window.API_URL + "/conversations", { headers: authHeader() });
  }
}

export default new UserService();
