import Vue from 'vue';
import Vuex from 'vuex';
import todoList from './modules/todoList';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todoList,
    users,
  },
});
