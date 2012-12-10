/**
 * Representa una tarea de una lista de tareas
 * @param title para el título de la tarea
 * @constructor
 */
function Task(title) {
    this.title = title;
    this.alreadyDone = false;
};

Task.prototype.isDone = function() {
    return this.alreadyDone;
};

Task.prototype.done = function() {
    this.alreadyDone = true;
};

/**
 * Representa una lista de tareas
 * @constructor
 */
function TodoList() {
    this.tasks = [];
};

TodoList.prototype.isEmpty = function() {
    return this.tasks.length === 0;
};

TodoList.prototype.addTask = function(title) {
    this.tasks.push(new Task(title));
};

TodoList.prototype.size = function() {
    return this.tasks.length;
};

TodoList.prototype.task = function(taskIndex) {
    return this.tasks[taskIndex]
}

TodoList.prototype.removeTask = function(taskIndex) {
    return this.tasks.splice(taskIndex,1 );
}
