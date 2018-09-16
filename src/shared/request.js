import axios from 'axios';
import { BASE_URL } from './config';

// 最初始的設定只能單獨設置才有用
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 3000;

// 自己封裝的額外設定
const otherConfig = {
  isReturnData: true,
  errorRedirectPath: null,
};

axios.defaults = {
  ...axios.defaults,
  ...otherConfig,
};

function onSuccess(axiosThis) {
  const { isReturnData } = axiosThis.defaults;

  return res => (isReturnData ? res.data : res);
}

function onError(axiosThis) {
  const { errorRedirectPath } = axiosThis.defaults;

  return (error) => {
    if (errorRedirectPath !== null) {
      // ... 頁面轉跳
    }
    if (error.response) {
      const { status, data, headers } = error.response;

      // ... 畫面跳出錯誤訊息，隨著 status code 轉跳不同頁面
      console.error('Status:', status);
      console.error('Data:', data);
      console.error('Headers:', headers);
      return Promise.reject(error.response);
    }

    console.error('Error Message:', error.message);
    return Promise.reject(error);
  };
}

axios.interceptors.response.use(onSuccess(axios), onError(axios));

// 新方法，可以修改預設值，創造另一個實例使用
axios.createNew = function createNew(config) {
  const newAxios = axios.create({
    ...otherConfig,
    ...config,
  });
  newAxios.interceptors.response.use(onSuccess(newAxios), onError(newAxios));
  return newAxios;
};

export default axios;
