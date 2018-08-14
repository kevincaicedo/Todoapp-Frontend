var app = new Vue({
	el: '#todo-app',
	mounted: function(){

	},
	computed: {

	},
	data: {
		lists: [],
		tempId: 0
	},
	methods: {
		newTask(data){
			// append new item todo list
			const _task = data.target.elements.task.value
			if(_task.trim().length == 0)
				return
			this.lists.push({ id: this.tempId++, name: _task, finished: false })
		},
		finishedTask(todo){
			console.log(todo)
		},
		editTaskTodo(todo){
			console.log(todo)
		},
		removeTodo(todo){
			console.log(todo)
		},
		showsTodoList(){

		}
	}
})