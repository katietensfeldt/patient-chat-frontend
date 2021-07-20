import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000";

class UserService {
  getPartners() {
    return axios.get(API_URL + "/users", { headers: authHeader() });
  }

  getUserConversations() {
    return axios.get(API_URL + "/conversations", { headers: authHeader() });
  }
}

export default new UserService();
