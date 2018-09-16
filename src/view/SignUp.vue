<template>
  <div class="container i-signUp">
    <div class="grid-12 desktop-2 mobile-1 align-center">
      <div class="col-9">
        <v-card>
          <h2 class="mb-b">{{ title }}</h2>
          <v-form
            ref="form"
            v-model="isValidSuccess"
            @submit.prevent="signUp(userId, password)"
            lazy-validation
          >
            <v-text-field
              v-model="userId"
              label="Account"
              name="userId"
              :rules="userIdRules"
              color="success"
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
              color="success"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              class="success"
              :loading="isLoading"
              :disabled="isLoading || !isValidSuccess"
            >
              Sign up
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
  name: 'SignUp',
  data() {
    return {
      title: 'Sign up',
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
      'signUpUser',
    ]),

    async signUp(userId, password) {
      if (!this.$refs.form.validate()) return;

      this.isLoading = true;
      this.message = 'Signing in...';
      const { isSuccess, msg } = await this.signUpUser({ userId, password });
      this.isLoading = false;
      this.message = msg;

      if (isSuccess) {
        setTimeout(() => this.$router.push('/login'), 800);
      }
    },
  },
};
</script>

<style lang="scss">
.i-signUp {
  margin-top: $spacing-xl;

  .card {
    background-color: $color-bg-lighter;
    border: 1px solid $color-success;
    padding: $spacing-m;
    color: inherit;
  }
}
</style>
