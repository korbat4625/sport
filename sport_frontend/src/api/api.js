import axios from 'axios';
const CancelToken = axios.CancelToken;
window.requestBox = [];

const axiosInctance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  cancelToken: new CancelToken(function (cancel) {
    window.requestBox.push(cancel)
  }),
  timeout: 3000
});

export default axiosInctance;
