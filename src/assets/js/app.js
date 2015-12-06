//
// Todo app
//

new Vue({
    el: '#tasks',

    data: {
        tasks: [],
        newTask: ''
    },

    computed: {
        completions: function() {
            return this.tasks.filter(function(task) {
                return task.completed;
            });
        },
        remaining: function() {
            return this.tasks.filter(function(task) {
                return ! task.completed;
            });
        }
    },

    filters: {
        inProcess: function(tasks) {
            return tasks.filter(function(tasks) {
                return ! tasks.completed;
            });
        }
    },

    methods: {
        addTask: function(e) {
            e.preventDefault();

            if(!this.newTask) return;

            this.tasks.push({
                body: this.newTask,
                completed: false
            });

            this.newTask = '';

            console.log(tasks);
        },

        editTask: function(task) {
            this.removeTask(task);
            this.newTask = task.body;

            this.$els.task.focus();
        },

        toggleTaskCompletion: function(task) {
            task.completed = !task.completed;
        },

        completeAll: function() {
            this.tasks.forEach(function(task) {
                task.completed = true;
            });
        },

        removeTask: function(task) {
            this.tasks.$remove(task);
        },

        clearCompleted: function() {
            this.tasks = this.tasks.filter(function(task) {
                return ! task.completed;
            });
        }
    }
});
