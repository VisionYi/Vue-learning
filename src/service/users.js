import request from '@/shared/request';

export default {
  getAllUsers() {
    return request.get('/users');
  },
  getUser(id) {
    return request.get(`/users/${id}`);
  },
  addUser(data) {
    return request.post('/users', data);
  },
  updateUser(id, data) {
    return request.patch(`/users/${id}`, data);
  },
  deleteUser(id) {
    return request.delete(`/users/${id}`);
  },
  queryUser(id) {
    return request.get(`/users?id=${id}`).then(data => data[0] || {});
  },
  queryToken(tokenId) {
    return request.get(`/users?tokenId=${tokenId}`).then(data => data[0] || {});
  },
};
