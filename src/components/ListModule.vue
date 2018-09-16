<template>
  <div class="_listModule">
    <div v-if="!isNothing" style="margin: 10px 0">
      <button class="btn btn-success" @click="changeCheckAll(list)">{{ isCheck }} All</button>
      <button class="btn btn-danger"  @click="deleteAll(list)">Delete All</button>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <div v-if="editedId === item.id">
          <input
            type="text"
            v-model.trim="editedText"
            @keyup.enter="confirmEdit(item.id, editedText)"
            @keyup.esc="cancelEdit()"
            v-focus
          >
          <button class="btn btn-info btn-sm" @click="confirmEdit(item.id, editedText)">確定</button>
          <button class="btn btn-secondary btn-sm" @click="cancelEdit()">取消</button>
        </div>
        <div v-else>
          <input
            type="checkbox"
            class="_listModule-checkbox"
            :id="item.id"
            :checked="item.completed"
            @change="changeCheckState(item)"
          >
          <label class="_listModule-text" :for="item.id">{{ item.text }}</label>
          <button class="btn btn-info btn-sm" @click="intoEdited(item)">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteItem(item)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('todoList');

export default {
  name: 'ListModule',
  props: {
    listState: null,
  },
  data() {
    return {
      editedText: '',
    };
  },
  computed: {
    ...mapGetters([
      'todoState',
      'doneState',
      'editedId',
      'todo',
      'done',
    ]),

    list() {
      if (this.listState === this.todoState) {
        return this.orderBy(this.todo, 'updateDate');
      }
      if (this.listState === this.doneState) {
        return this.orderBy(this.done, 'updateDate');
      }
      return [];
    },
    isCheck() {
      return this.listState === this.todoState ? 'Check' : 'UnCheck';
    },
    isNothing() {
      return this.list.length === 0;
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },

  methods: {
    ...mapActions([
      'changeCheckState',
      'deleteItem',
      'editItem',
    ]),
    ...mapActions({
      changeCheckAll: 'changeCheckItemList',
      deleteAll: 'deleteItemList',
    }),
    ...mapMutations([
      'setEditedId',
    ]),

    // 內容必須為字串，且字串長度必須都一樣，排序字串比較省效能
    orderBy(array, props) {
      return array.sort((param1, param2) => param1[props].localeCompare(param2[props]));
    },

    intoEdited(item) {
      this.setEditedId(item.id);
      this.editedText = item.text;
    },
    confirmEdit(id, text) {
      this.editItem({ id, text });
      this.setEditedId(null);
    },
    cancelEdit() {
      this.setEditedId(null);
    },
  },
};
</script>

<style lang="scss" scoped>
._listModule {

  $this: &;

  &-text {
    font-size: $font-size-m;
    margin: 0 $spacing;
    cursor: pointer;
  }

  &-checkbox {
    display: none;

    & + #{$this}-text:before {
      content: '🔲';
      margin-right: $spacing-s;
    }

    &:checked + #{$this}-text:before {
      content: '✅';
    }
  }
}
</style>
