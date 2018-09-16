const [TODO_STORAGE_KEY, DONE_STORAGE_KEY] = ['ex-4-todoData', 'ex-4-doneData'];
const [TODO_STATE, DONE_STATE] = [false, true];
const getRandomId = (number = 5) => Math.random().toString(36).substr(2, number);
const getListData = key => JSON.parse(localStorage.getItem(key)) || [];
const saveListData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const bus = new Vue();

const addTodo = {
    template: '#add-todo',
    data() {
        return {
            newTodoText: '',
        };
    },
    methods: {
        addTodoItem() {
            if (!this.newTodoText) return;
            const item = {
                id: getRandomId(),
                text: this.newTodoText,
                completed: false,
            };

            bus.$emit('add-todo-item', item);
            this.newTodoText = '';
        }
    }
};

let lastItemModule;
const itemModule = {
    template: '#item-module',
    props: {
        outItem: Object,
    },
    data() {
        return {
            item: JSON.parse(JSON.stringify(this.outItem)),
            isEditedState: false,
            beforeText: this.outItem.text,
        };
    },
    methods: {
        changeCheck() {
            const args = [this.item, this.outItem];
            bus.$emit('change-check', ...args);
        },
        deleteItem() {
            bus.$emit('delete-item', this.outItem);
        },
        intoEdited() {
            // 對上次操作的 itemModule 做確認編輯
            if (lastItemModule) {
                lastItemModule.confirmEdit();
                lastItemModule.isEditedState = false;
            }
            this.isEditedState = true;
            lastItemModule = this;
        },
        confirmEdit() {
            if (!this.item.text || this.item.text === this.beforeText) {
                this.cancelEdit();
                return;
            }
            this.isEditedState = false;
            this.beforeText = this.item.text;

            const args = [this.item, this.outItem];
            bus.$emit('confirm-edit', ...args);
        },
        cancelEdit() {
            this.isEditedState = false;
            this.item.text = this.beforeText;
        },
    },
};

/**
 * watch 只適合用來監看狀態的改變而已，其他場合就盡量別使用
 * 尤其是在使用重複的組件時，用 watch 監看資料內容，可能會產生資料混淆
 */

const listModule = {
    template: '#list-module',
    components: {
        itemModule,
    },
    mounted() {
        bus.$on('add-todo-item', this.insertItem);
        bus.$on('confirm-edit', this.updateItem);
        bus.$on('change-check', this.changeCheck);
        bus.$on('delete-item', this.deleteItem);
        bus.$on('check-all', this.checkAll_Done);
        bus.$on('unCheck-all', this.unCheckAll_Todo);
    },
    props: {
        listState: null,
    },
    data() {
        return {
            list: this.filter(),
        };
    },
    computed: {
        isCheck() {
            return this.listState === TODO_STATE ? 'Check' : 'UnCheck';
        },
        isNothing() {
            return this.list.length === 0 ? true : false;
        }
    },
    methods: {
        filter() {
            if (this.listState === TODO_STATE) return getListData(TODO_STORAGE_KEY);
            if (this.listState === DONE_STATE) return getListData(DONE_STORAGE_KEY);
        },
        insertItem(item) {
            if(this.listState !== TODO_STATE) return;
            this.list.push(item);
            this.saveToStorage();
        },
        updateItem(newItem, oldItem) {
            if(this.listState !== newItem.completed) return;
            this.list.splice(this.list.indexOf(oldItem), 1, newItem);
            this.saveToStorage();
        },
        deleteItem(item) {
            if(this.listState !== item.completed) return;
            this.list.splice(this.list.indexOf(item), 1);
            this.saveToStorage();
        },
        changeCheck(newItem, oldItem) {
            if(this.listState !== newItem.completed) {
                this.list.splice(this.list.indexOf(oldItem), 1);
            } else {
                this.list.push(newItem);
            }
            this.saveToStorage();
        },
        saveToStorage() {
            if (this.listState === TODO_STATE) saveListData(TODO_STORAGE_KEY, this.list);
            if (this.listState === DONE_STATE) saveListData(DONE_STORAGE_KEY, this.list);
        },

        isCheckAll() {
            if (this.listState === TODO_STATE) bus.$emit('check-all', this.list);
            if (this.listState === DONE_STATE) bus.$emit('unCheck-all', this.list);
            this.list.splice(0);
            this.saveToStorage();
        },
        deleteAll() {
            this.list.splice(0);
            this.saveToStorage();
        },
        checkAll_Done(todoList) {
            if(this.listState !== DONE_STATE) return;

            const checkList = todoList.map(item => Object.assign({}, item, {completed: !item.completed}));
            this.list.push(...checkList);
            this.saveToStorage();
        },
        unCheckAll_Todo(doneList) {
            if(this.listState !== TODO_STATE) return;

            const unCheckList = doneList.map(item => Object.assign({}, item, {completed: !item.completed}));
            this.list.push(...unCheckList);
            this.saveToStorage();
        },
    }
};

new Vue({
    el: '#app',
    components: {
        addTodo,
        listModule,
    },
    data: {
        todoState: TODO_STATE,
        doneState: DONE_STATE,
    },
});
