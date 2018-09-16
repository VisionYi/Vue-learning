<template>
  <div class="i-navbar">
    <v-toolbar class="primary" prominent>
      <div class="container-fluid i-navbar__container">
        <div class="i-navbar__item i-navbar__item--header">
          <router-link class="i-navbar__brand" :to="{name: 'home'}">Vue-learning</router-link>
          <span class="i-navbar__toggle mobile-only">
            <v-btn
              icon
              color="white--text"
              @click.native="toggle('#expansion', 'is-expanded')"
            >
              <v-icon>fas fa-bars</v-icon>
            </v-btn>
          </span>
        </div>
        <div class="i-navbar__expansion flex-filled" id="expansion">
          <div class="i-navbar__item i-navbar__item--expandable">
            <nav class="i-navbar__menu i-navbar__menu--expandable">
              <router-link
                v-for="(router, index) in menuRouters"
                :key="index"
                class="i-navbar__menu__link"
                :class="{'is-active': nowRouterName === router.name}"
                :to="{name: router.name}"
                v-ripple
              >
                {{router.display}}
              </router-link>
            </nav>
            <div class="i-navbar__item ml-auto" v-if="userId">
              <span class="i-navbar__name-id mr-b">{{ (userId || '') + LoadingText }}</span>
              <v-btn outline @click.native="logout()">Log out</v-btn>
            </div>
            <div class="i-navbar__item ml-auto" v-else>
              <v-btn outline class="mr-b" :to="{name: 'login'}">Log in</v-btn>
              <v-btn outline :to="{name: 'signUp'}">Sign up</v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { slideToggle } from '@/shared/util';

export default {
  name: 'Navbar',
  data() {
    return {
      menuRouters: [
        {
          name: 'home',
          display: 'Home',
        },
        {
          name: 'todoList',
          display: 'Todo List',
        },
        {
          name: 'shop',
          display: 'Shopping Store',
        },
        {
          name: 'messageBoard',
          display: '留言板',
        },
      ],
      LoadingText: '',
    };
  },
  computed: {
    ...mapGetters('users', [
      'userId',
    ]),
    nowRouterName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions('users', [
      'logoutUser',
    ]),
    logout() {
      this.LoadingText = ' Logging out..';
      setTimeout(() => {
        this.logoutUser();
        this.$router.replace('/');
        this.LoadingText = '';
      }, 800);
    },
    toggle(selector, expandClassName) {
      const el = document.querySelector(selector);
      slideToggle(el, expandClassName);
    },
  },
};
</script>

<style lang="scss">
.i-navbar {
  position: relative;

  &__container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 3.5rem;

    @include respond-to('mobile') {
      height: auto;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;

    $thisItem: &;

    @include respond-to('mobile') {
      height: auto;

      &--header {
        width: 100%;
        height: 3.25rem;
      }

      &--expandable {
        width: 100%;
        height: auto;
        padding: 0 $spacing-s $spacing $spacing-s;

        #{$thisItem} {
          width: 100%;
        }
      }
    }
  }

  &__expansion {
    display: block;
    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    @include respond-to('mobile') {
      display: none;

      &.is-expanded {
        display: block;
      }
    }
  }

  &__brand {
    padding: $spacing-s 0;
    margin-right: $spacing;
    color: $color-text-reverse;
    font-size: $font-size-m;
  }

  &__toggle {
    margin-left: auto;
  }

  &__menu {
    display: flex;
    flex-direction: row;

    &__link {
      padding: $spacing-s;
      border-radius: 2px;
      color: $color-text-reverse-light;

      &.is-active {
        color: $color-text-reverse;
      }

      &:hover {
        background-color: $color-bg-cover;
        color: $color-text-reverse;
      }
    }

    $thisMenu: &;

    @include respond-to('mobile') {

      &--expandable {
        width: 100%;
        flex-direction: column;
        margin-bottom: $spacing;

        #{$thisMenu}__link {
          width: 100%;
          border-radius: 0;
          border-bottom: 1px solid $color-text-reverse-light;
        }
      }
    }
  }

  &__name-id {
    margin-right: $spacing-m;
    font-size: $font-size-m;
    font-weight: bold;
  };
}
</style>
