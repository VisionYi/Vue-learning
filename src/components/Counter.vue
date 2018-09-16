<template>
  <div class="c-counter mb-s" :class="color">
    <v-btn
      class="c-counter__sub"
      :class="color"
      flat
      @click="sub"
      :disabled="subDisabled"
    >
      <v-icon>fas fa-minus</v-icon>
    </v-btn>
    <input
      type="text"
      class="i-input"
      @input="onInput"
      ref="inputNumber"
    >
    <v-btn
      class="c-counter__add"
      :class="color"
      flat
      @click="add"
      :disabled="addDisabled"
    >
      <v-icon>fas fa-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1,
    },
    number: {
      type: [Number, String],
      default: 1,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  model: {
    prop: 'number',
    event: 'change',
  },

  computed: {
    // 取代 props 的 number，讓組件之間關聯的 data 可以雙向綁定，但需手動更新綁定的 DOM 元素
    _number: {
      get() {
        if (this.number === '') {
          return '';
        }
        return parseInt(this.number, 10);
      },
      set(value) {
        let newValue;

        // isNaN(value)，若 value 是字串且不是數字的字串 (NaN) 時等於 true，
        // 數字、文字字串、''、null 都等於 false
        if (isNaN(value) || value === '') {
          newValue = '';
        } else
        if (this.max !== null && parseInt(value, 10) > this.max) {
          newValue = this.max;
        } else
        if (this.min !== null && parseInt(value, 10) < this.min) {
          newValue = this.min;
        } else {
          newValue = value;
        }

        // 回傳事件變化
        this.$emit('change', newValue);
        // 更新指定的 DOM 元素
        this.$refs.inputNumber.value = newValue;
      },
    },
    addDisabled() {
      return this._number === '' || this._number === this.max;
    },
    subDisabled() {
      return this._number === '' || this._number === this.min;
    },
  },

  mounted() {
    this.$refs.inputNumber.value = this._number;
  },
  methods: {
    onInput(event) {
      this._number = event.target.value;
    },
    add() {
      this._number += this.step;
    },
    sub() {
      this._number -= this.step;
    },
  },
};
</script>

<style lang="scss">
.c-counter {
  display: flex;

  .i-input {
    flex: 1 1 auto;
    border-width: 1px 0;
    border-radius: 0;
    border-color: inherit;
    padding: 0 $spacing-s;
    text-align: center;
  }

  &__sub.btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    min-width: initial; // 更改 vuetify btn 的內容
  }
  &__add.btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    min-width: initial; // 更改 vuetify btn 的內容
  }
}
</style>
