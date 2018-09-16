<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="grid desktop-4 tablet-2 mobile-1">
      <div class="col">
        <router-link class="item" :to="routerLink.todoList"><h2>Todo List</h2></router-link>
      </div>
      <div class="col">
        <router-link class="item" :to="routerLink.msgBoard"><h2>留言板</h2></router-link>
      </div>
      <div class="col" v-if="!isLogin">
        <router-link class="item" :to="routerLink.login"><h2>登入系統</h2></router-link>
      </div>
      <div class="col" v-if="!isLogin">
        <router-link class="item" :to="routerLink.signUp"><h2>註冊會員</h2></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: '# Home',
      routerLink: {
        login: { name: 'login' },
        signUp: { name: 'signUp' },
        todoList: { name: 'todoList' },
        msgBoard: { name: 'messageBoard' },
      },
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters['users/userId'];
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  box-shadow: 0px 0px 10px #ccc;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px #888;
    text-decoration: unset;
  }
}
</style>
