// src/services/api/authApi.js
import httpService from "../http/httpService";

const authApi = {
  login: (credentials) => httpService.post("/auth/login", credentials),

  forgotPassword: (email) => httpService.post("/auth/forgot-password", email),

  changePassword: (passwordData) =>
    httpService.put("/auth/change-password", passwordData),

  resetPassword: (resetData) =>
    httpService.put("/auth/reset-password", resetData),

  createPassword: (createPasswordData) =>
    httpService.post("/users/create-password", createPasswordData),
};

export default authApi;
