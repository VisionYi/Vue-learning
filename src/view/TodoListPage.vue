<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <hr>
    <div class="grid-12 align-center tablet-filled mobile-1">
      <div class="col-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="To do..."
            v-model.trim="newTodoText"
            @keyup.enter="addTodoItem(newTodoText)"
            autofocus
          >
          <div class="input-group-append">
            <button class="btn btn-success" @click="addTodoItem(newTodoText)">add</button>
          </div>
        </div>
      </div>
      <div class="w-100"></div>
      <div class="col-4">
        <h2>Todo List</h2>
        <list-module :list-state="todoState"></list-module>
      </div>
      <div class="col-4 offset-1">
        <h2>Done List</h2>
        <list-module :list-state="doneState"></list-module>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TodoListPage',
  data() {
    return {
      title: '# Todo List',
      newTodoText: '',
    };
  },
  mounted() {
    this.initialTodoList();
  },
  computed: {
    ...mapGetters('todoList', [
      'todoState',
      'doneState',
    ]),
  },
  methods: {
    ...mapActions('todoList', [
      'initialTodoList',
      'addItem',
    ]),
    addTodoItem(text) {
      if (!text) return;
      this.addItem(text);
      this.newTodoText = '';
    },
  },
};
</script>

<style>

</style>
