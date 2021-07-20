import axios from "axios";

const API_URL = "http://localhost:3000";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/sessions", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(first_name, last_name, email, password, password_confirmation, type_of) {
    return axios.post(API_URL + "/users", {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      type_of,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
