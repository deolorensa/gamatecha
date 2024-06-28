import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
  }),
  getters: {
    isAuthenticated: (state) => state.token !== null,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(
          "http://103.164.54.252:8000/api/auth/login",
          {
            username,
            password,
          }
        );
        this.token = response.data.access;
        this.username = username;
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("username", username);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});
