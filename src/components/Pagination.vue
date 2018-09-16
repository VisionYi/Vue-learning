<template>
  <ul class="c-pagination">
    <li class="c-pagination__prev">
      <a title="上一頁" class="c-pagination__link" :class="{'is-disabled': _page <= 1}">
        <v-icon @click="onPrev">fas fa-chevron-left</v-icon>
      </a>
    </li>
    <li class="c-pagination__page">
      <select class="i-select" aria-label="page" @change="onChange" ref="select">
        <option
          v-for="number in total"
          :key="number"
          :value="number"
        >
          {{ number }}
        </option>
      </select>
    </li>
    <li class="c-pagination__total">{{ total }}</li>
    <li class="c-pagination__next">
      <a title="下一頁" class="c-pagination__link" :class="{'is-disabled': _page >= total}">
        <v-icon @click="onNext">fas fa-chevron-right</v-icon>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: [Number, String],
      default: 0,
    },
  },
  model: {
    prop: 'page',
    event: 'change',
  },
  computed: {
    // 取代 props 的 page，讓組件之間關聯的 data 可以雙向綁定，但需手動更新綁定的 DOM 元素
    _page: {
      get() {
        return parseInt(this.page, 10);
      },
      set(value) {
        // 回傳事件變化
        this.$emit('change', parseInt(value, 10));
        // 更新指定的 DOM
        this.$refs.select.value = value;
      },
    },
  },
  mounted() {
    this.$refs.select.value = this._page;
  },
  methods: {
    onChange(event) {
      this._page = event.target.value;
    },
    onPrev() {
      if (this._page > 1) {
        this._page -= 1;
      }
    },
    onNext() {
      if (this._page < this.total) {
        this._page += 1;
      }
    },
  },
};
</script>

<style lang='scss'>
.c-pagination {
  display: flex;
  align-items: center;
  font-size: $font-size-m;

  &__prev {
  }

  &__next {
    margin-left: auto;
  }

  &__page {
    margin-left: auto;
    margin-right: 1rem;

    .i-select {
      padding: 0 0.6rem;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  }

  &__total {
    &:before {
      content: '/';
      margin-right: 1rem;
    }
  }

  &__link {
    color: $color-text;
    text-decoration: none;

    .icon {
      width: 2.25em;
      height: 2.25em;
      border-radius: 50%;

      &:hover {
        background-color: $color-bg-light;
      }
    }

    &.is-disabled .icon {
      opacity: 0.3;
      cursor: not-allowed;

      &:hover {
        background-color: initial;
      }
    }
  }
}
</style>
