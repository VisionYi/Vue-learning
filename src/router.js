import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/view/Home';
import TodoList from '@/view/TodoListPage';
import MessageBoard from '@/view/MessageBoard';
import Login from '@/view/Login';
import SignUp from '@/view/SignUp';
import ShoppingStore from '@/view/ShoppingStore';
import Product from '@/view/Product';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
    },
    {
      path: '/todo-list',
      name: 'todoList',
      component: TodoList,
    },
    {
      path: '/message-board',
      name: 'messageBoard',
      component: MessageBoard,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShoppingStore,
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
    },
  ],
});
