import axios from "axios";

const ApiService = {
  _interceptor: null,
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
    // this.setToken();
  },
  get(resource, options) {
    if (options) {
      return axios.get(resource, options);
    }
    return axios.get(resource);
  },

  post(resource, data, options) {
    if (options) {
      return axios.post(resource, data, options);
    } else {
      return axios.post(resource, data);
    }
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  }
};

export default ApiService;
