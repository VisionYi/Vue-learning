<template>
  <form class="i-search" :class="{'i-search--right': iconRight}" :action="url" @reset="reset()">
    <input
      type="text"
      name="q"
      class="i-input"
      ref="input"
      v-model.trim="searchText"
      :placeholder="placeholder"
      :aria-label="label"
    >
    <button type="submit" class="i-search__submit">
      <v-icon>fas fa-search</v-icon>
    </button>
    <button type="reset" class="i-search__reset" v-show="searchText">
      <v-icon>fas fa-times-circle</v-icon>
    </button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    label: {
      type: String,
      default: 'search',
    },
    placeholder: {
      type: String,
      default: 'search...',
    },
    url: String,
    iconRight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    reset() {
      this.searchText = '';
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss">
.i-search {
  position: relative;
  width: 100%;
  font-size: $font-size;

  .i-input {
    height: inherit;
    width: inherit;
    padding: 0 2em;
  }

  &__submit {
    position: absolute;
    top: 0;
    left: 0.5em;
    height: inherit;
  }

  &__reset {
    position: absolute;
    top: 0;
    right: 0.5em;
    height: inherit;
  }

  $this: &;

  &--right {
    .i-input {
      padding-left: 0.5em;
    }
    #{$this}__submit {
      left: auto;
      right: 0.5em;
    }
    #{$this}__reset {
      display: none;
    }
  }
}
</style>
