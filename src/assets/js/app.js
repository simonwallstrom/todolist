//
// Todo app
//

function fetchArray(key){
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }
    return [];
}

function saveArray(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

new Vue({
    el: '#tasks',

    data: {
        tasks: fetchArray("tasks"),
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

    ready: function(){
        this.$watch('tasks', function(value){
            saveArray('tasks', value);
            console.log('saved');
        });
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
