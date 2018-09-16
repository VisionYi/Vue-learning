<template>
  <div class="container i-login">
    <div class="grid-12 desktop-2 mobile-1 align-center">
      <div class="col-9">
        <v-card>
          <h2 class="mb-b">{{ title }}</h2>
          <v-form
            ref="form"
            v-model="isValidSuccess"
            @submit.prevent="login(userId, password)"
            lazy-validation
          >
            <v-text-field
              v-model="userId"
              label="Account"
              name="userId"
              :rules="userIdRules"
              required
              autofocus
            ></v-text-field>
            <v-text-field
              class="mb-b"
              v-model="password"
              label="Password"
              name="password"
              :rules="passwordRules"
              hint="Password 至少 4 碼"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              class="primary"
              :loading="isLoading"
              :disabled="isLoading || !isValidSuccess"
            >
              Log in
            </v-btn>
            {{ message }}
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      title: 'Login',
      userId: '',
      password: '',
      message: '',
      isLoading: false,
      isValidSuccess: true,
      userIdRules: [
        v => v !== '' || 'Account 是必要的',
      ],
      passwordRules: [
        v => v !== '' || 'Password 是必要的',
        v => v.length >= 4 || 'Password 至少 4 碼',
      ],
    };
  },
  methods: {
    ...mapActions('users', [
      'loginUser',
    ]),

    async login(userId, password) {
      if (!this.$refs.form.validate()) return;

      this.isLoading = true;
      this.message = 'Logging in...';
      const { isSuccess, msg } = await this.loginUser({ userId, password });
      this.isLoading = false;
      this.message = msg;

      if (isSuccess) {
        setTimeout(() => this.$router.push('/'), 800);
      }
    },
  },
};
</script>

<style lang="scss">
.i-login {
  margin-top: $spacing-xl;

  .card {
    background-color: $color-bg-lighter;
    border: 1px solid $color-primary;
    padding: $spacing-m;
    color: inherit;
  }
}
</style>
