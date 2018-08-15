var app = new Vue({
	el: '#todo-app',
	mounted: function(){
		this.showsTodoList()
	},
	data: {
		lists: [],
		cacheTemp: ''
	},
	methods: {
		newTask(data){
			// append new item todo list
			const _task = data.target.elements.task.value.trim()
			data.target.elements.task.value = ""
			if(_task.length == 0)
				return
			var item = { name: _task, finished: false }
			
			// resquest post new todo
			axios.post("https://protected-plains-91489.herokuapp.com/api/todos", item).then((res) => {
				M.toast({html: res.data.info})
				item['id'] = res.data.data
				this.lists.push(item)
            }).catch((error) => {
            	M.toast({html: 'Error al guardar tu tarea!'})
            	this.lists.pop()
            });

		},
		preventUpdate(name){
			this.cacheTemp = name.trim();
		},
		editTaskTodo(todo, message=null){
			if(!message && todo.name.trim() === this.cacheTemp)
				return
			axios.put("https://protected-plains-91489.herokuapp.com/api/todos/"+todo.id, todo).then((res) => {
				M.toast({html: message ? ( todo.finished ? message : 'Actividad restablecida' ) : res.data.info })
            }).catch((error) => {
            	M.toast({html: 'Error al guardar tu tarea!'})
            });
		},
		removeTodo(id, index){
			var item = this.lists.splice( index, 1)
			axios.delete("https://protected-plains-91489.herokuapp.com/api/todos/"+id).then((res) => {
				M.toast({html: res.data.info})
            }).catch((error) => {
            	M.toast({html: 'Error al guardar tu tarea!'})
            	this.lists.splice( index, 1, item)
            });
		},
		showsTodoList(){
			axios.get("https://protected-plains-91489.herokuapp.com/api/todos").then((res) => {
				this.lists = res.data.data
				console.log(this.lists)
            }).catch((error) => {
            	M.toast({html: 'Error al carga tus tareas!'})
            });
		}
	}
})