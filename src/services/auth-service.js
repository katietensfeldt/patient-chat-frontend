import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post(window.API_URL + "/sessions", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
  }

  register(first_name, last_name, email, password, password_confirmation, type_of) {
    return axios.post(window.API_URL + "/users", {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      type_of,
    });
  }

  getCurrentUserId() {
    const id = localStorage.getItem("user_id");

    return id;
  }
}

export default new AuthService();
