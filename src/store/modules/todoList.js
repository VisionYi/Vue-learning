import service from '@/service/todoList';
import { getRandomId } from '@/shared/util';
import { DATE_FORMAT } from '@/shared/config';
import moment from 'moment';

export default {
  namespaced: true,

  state: {
    list: [],
    todoState: 'todo',
    doneState: 'done',
    editedId: null,
  },

  getters: {
    list: state => state.list,
    todoState: state => state.todoState,
    doneState: state => state.doneState,
    editedId: state => state.editedId,
    todo: state => state.list.filter(item => !item.completed),
    done: state => state.list.filter(item => item.completed),
    userId: (state, getters, rootState, rootGetters) => rootGetters['users/userId'],
  },

  actions: {
    async initialTodoList({ commit, getters }) {
      if (getters.userId) {
        commit('setList', await service.getList());
      } else {
        commit('setList', []);
      }
    },

    addItem({ commit, getters }, text) {
      const item = {
        id: getRandomId(),
        userId: getters.userId,
        text,
        completed: false,
        updateDate: moment().format(DATE_FORMAT),
      };
      commit('pushItem', item);
      if (getters.userId) service.addListId(item);
    },

    editItem({ commit, getters }, { id, text }) {
      commit('updateItem', { id, text });
      if (getters.userId) service.updateListId(id, { text });
    },

    changeCheckState({ commit, getters }, { id, completed }) {
      const updateData = {
        completed: !completed,
        updateDate: moment().format(DATE_FORMAT),
      };
      commit('updateItem', { id, ...updateData });
      if (getters.userId) service.updateListId(id, updateData);
    },

    deleteItem({ commit, getters }, { id }) {
      commit('deleteItem', id);
      if (getters.userId) service.deleteListId(id);
    },

    changeCheckItemList({ state, dispatch }, itemList = state.list) {
      [...itemList].forEach((item) => {
        dispatch('changeCheckState', item);
      });
    },

    deleteItemList({ state, dispatch }, itemList = state.list) {
      [...itemList].forEach((item) => {
        dispatch('deleteItem', item);
      });
    },
  },

  mutations: {
    setList(state, list) {
      state.list = list;
    },
    pushItem(state, item) {
      state.list.push(item);
    },
    updateItem(state, { id, ...data }) {
      const index = state.list.findIndex(item => item.id === id);
      state.list.splice(index, 1, { ...state.list[index], ...data });
    },
    deleteItem(state, id) {
      const index = state.list.findIndex(item => item.id === id);
      state.list.splice(index, 1);
    },
    setEditedId(state, id) {
      state.editedId = id;
    },
  },
};
