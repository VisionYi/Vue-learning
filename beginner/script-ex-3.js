const [TODO_STORAGE_KEY, DONE_STORAGE_KEY] = ['ex-3-todoData', 'ex-3-doneData'];
const getRandomId = (number = 5) => Math.random().toString(36).substr(2, number);
const getTodoData = () => JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
const getDoneData = () => JSON.parse(localStorage.getItem(DONE_STORAGE_KEY)) || [];
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
                editedState: false,
            };
            bus.$emit('add-todo-item', item);
            this.newTodoText = '';
        }
    }
};

const itemModule = {
    template: '#item-module',
    props: {
        outItem: Object,
    },
    data() {
        return {
            item: JSON.parse(JSON.stringify(this.outItem)),
        };
    },
    methods: {
        changeCheck() {
            const args = [this.item, this.outItem];
            bus.$emit('change-check', ...args);
        },
        intoEdited() {
            this.item.editedState = true;
            const args = [this.item, this.outItem];
            bus.$emit('into-edited', ...args);
        },
        deleteItem() {
            bus.$emit('delete-item', this.outItem);
        },
    }
};

const editedModule = {
    template: '#edited-module',
    props: {
        outItem: Object,
    },
    data() {
        return {
            item: JSON.parse(JSON.stringify(this.outItem)),
            beforeText: this.outItem.text,
        };
    },
    methods: {
        confirmEdit() {
            if (!this.item.text || this.item.text === this.beforeText) {
                this.cancelEdit();
                return;
            }
            this.item.editedState = false;
            this.beforeText = this.item.text;

            const args = [this.item, this.outItem];
            bus.$emit('confirm-edit', ...args);
        },
        cancelEdit() {
            this.item.editedState = false;
            this.item.text = this.beforeText;

            const args = [this.item, this.outItem];
            bus.$emit('cancel-edit', ...args);
        },
    },
};

const todoListModule = {
    template: '#todo-list-module',
    components: {
        itemModule,
        editedModule,
    },
    data() {
        return {
            todoList: getTodoData(),
            completedState: false,
        };
    },
    watch: {
        todoList(newVal, oldVal) {
            console.log('todo save');
            this.saveToStorage();
        },
    },
    mounted() {
        bus.$on('add-todo-item', this.addTodoItem);
        bus.$on('change-check', this.changeCheck);
        bus.$on('delete-item', this.deleteItem);
        bus.$on('into-edited', this.intoEdited);
        bus.$on('confirm-edit', this.confirmEdit);
        bus.$on('cancel-edit', this.cancelEdit);
    },
    methods: {
        addTodoItem(item) {
            this.todoList.push(item);
        },
        changeCheck(newItem, oldItem) {
            if(newItem.completed === this.completedState) {
                this.todoList.push(newItem);
            } else {
                this.todoList.splice(this.todoList.indexOf(oldItem), 1);
            }
        },
        deleteItem(item) {
            if(item.completed !== this.completedState) return;
            this.todoList.splice(this.todoList.indexOf(item), 1);
        },
        intoEdited(newItem, oldItem) {
            if(newItem.completed !== this.completedState) return;
            this.todoList.splice(this.todoList.indexOf(oldItem), 1, newItem);
        },
        confirmEdit(newItem, oldItem) {
            if(newItem.completed !== this.completedState) return;
            this.todoList.splice(this.todoList.indexOf(oldItem), 1, newItem);
        },
        cancelEdit(newItem, oldItem) {
            if(newItem.completed !== this.completedState) return;
            this.todoList.splice(this.todoList.indexOf(oldItem), 1, newItem);
        },
        saveToStorage() {
            localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(this.todoList));
        },
    }
};

const doneListModule = {
    template: '#done-list-module',
    components: {
        itemModule,
        editedModule,
    },
    data() {
        return {
            doneList: getDoneData(),
            completedState: true,
        };
    },
    watch: {
        doneList(newVal, oldVal) {
            console.log('done save');
            this.saveToStorage();
        },
    },
    mounted() {
        bus.$on('change-check', this.changeCheck);
        bus.$on('delete-item', this.deleteItem);
        bus.$on('into-edited', this.intoEdited);
        bus.$on('confirm-edit', this.confirmEdit);
        bus.$on('cancel-edit', this.cancelEdit);
    },
    methods: {
        changeCheck(newItem, oldItem) {
            if(newItem.completed === this.completedState) {
                this.doneList.push(newItem);
            } else {
                this.doneList.splice(this.doneList.indexOf(oldItem), 1);
            }
        },
        deleteItem(item) {
            if(item.completed !== this.completedState) return;
            this.doneList.splice(this.doneList.indexOf(item), 1);
        },
        intoEdited(newItem, oldItem) {
            if(newItem.completed !== this.completedState) return;
            this.doneList.splice(this.doneList.indexOf(oldItem), 1, newItem);
        },
        confirmEdit(newItem, oldItem) {
            if(newItem.completed !== this.completedState) return;
            this.doneList.splice(this.doneList.indexOf(oldItem), 1, newItem);
        },
        cancelEdit(newItem, oldItem) {
            if(newItem.completed !== this.completedState) return;
            this.doneList.splice(this.doneList.indexOf(oldItem), 1, newItem);
        },
        saveToStorage() {
            localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(this.doneList));
        },
    }
};

new Vue({
    el: '#app',
    components: {
        addTodo,
        todoListModule,
        doneListModule,
    }
});
