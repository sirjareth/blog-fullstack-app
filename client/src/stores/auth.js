import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    fullName: localStorage.getItem('fullName') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    login(token, fullName) {
      this.token = token;
      this.fullName = fullName;
      localStorage.setItem('token', token);
      localStorage.setItem('fullName', fullName);
    },
    logout() {
      this.token = null;
      this.fullName = null;
      localStorage.removeItem('token');
      localStorage.removeItem('fullName');
    }
  }
});