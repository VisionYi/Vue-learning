import request from '@/shared/request';
import { getLocalData } from '@/shared/util';
import { USER_INFO_KEY } from '@/shared/config';

// 再發出請求前加上 Token Authentication 的內容
// 真正開發上是必須要用 tokenId 放在 headers 上才對，這裡方便使用就改成 userId 代替
const requestUser = request.createNew();
requestUser.interceptors.request.use(
  (config) => {
    const addTokenURL = `${config.url}?userId=${getLocalData(USER_INFO_KEY, {}).userId}`;
    return { ...config, url: addTokenURL };
  },
);

export default {
  getAllUsersList() {
    return request.get('/todoList');
  },
  getList() {
    return requestUser.get('/todoList');
  },
  getListId(id) {
    return requestUser.get(`/todoList/${id}`);
  },
  addListId(data) {
    return requestUser.post('/todoList', data);
  },
  updateListId(id, data) {
    return requestUser.patch(`/todoList/${id}`, data);
  },
  deleteListId(id) {
    return requestUser.delete(`/todoList/${id}`);
  },
};
