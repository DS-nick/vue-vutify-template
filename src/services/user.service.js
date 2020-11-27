import ApiService from "./api.service.js";

export default {
  getUsers: async () => {
    let response = await ApiService.get("users/");
  }
};
