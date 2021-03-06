const tasks = [
	{
		_id: '5d2ca9e2e03d40b326596aa7',
		completed: true,
		body:
			'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
		title: 'Eu ea incididunt sunt consectetur fugiat non.',
	},
	{
		_id: '5d2ca9e29c8a94095c1288e0',
		completed: false,
		body:
			'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
		title:
			'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
	},
	{
		_id: '5d2ca9e2e03d40b3232496aa7',
		completed: true,
		body:
			'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
		title: 'Eu ea incididunt sunt consectetur fugiat non.',
	},
	{
		_id: '5d2ca9e29c8a94095564788e0',
		completed: false,
		body:
			'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
		title:
			'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
	},
];

(function (arrOfTasks) {
	const objOfTasks = arrOfTasks.reduce((acc, task) => {
		acc[task._id] = task;
		return acc;
	}, {});

	//Elements UI

	const listContainer = document.querySelector('.tasks-list-section .list-group');

	const form = document.forms['addTask'];
	const inputTitle = form.elements['title'];
	const inputBody = form.elements['body'];

	renderAllTasks(objOfTasks);

	form.addEventListener('submit', onFormSubmitHandler);

	listContainer.addEventListener('click', onDeleteHandler);

	listContainer.addEventListener('click', onReadyHandler);

	function renderAllTasks(tasksList) {
		if (!tasksList) {
			console.log('Enter tasks list');
			return;
		}
		checkOnEmptyList(objOfTasks);
		const fragment = document.createDocumentFragment();
		Object.values(tasksList).forEach(task => {
			const li = listItemTemplate(task);
			fragment.appendChild(li);
		});
		listContainer.appendChild(fragment);
	}

	function checkOnEmptyList(tasksObj) {
		const deleteElement = document.querySelector('.empty-list');
		if (deleteElement)
			deleteElement.remove();

		else if (Object.keys(tasksObj).length == 0)
			listContainer.insertAdjacentElement('beforebegin', createEmptyElement());
	}

	function createEmptyElement() {
		const article = document.createElement('p');
		article.textContent = 'Task list is empty';
		article.classList.add('empty-list', 'd-flex', 'justify-content-center', 'mt-2');
		return article;
	}

	function listItemTemplate({ _id, title, body } = {}) {
		const li = document.createElement('li');
		li.classList.add(
			'list-group-item',
			'd-flex',
			'align-items-center',
			'flex-wrap',
			'mt-2',
		);

		li.setAttribute('data-task-id', _id);

		const divWrapper = document.createElement('div');
		divWrapper.classList.add('list-task-wrapper')

		const span = document.createElement('span');
		span.textContent = title;
		span.style.fontWeight = 'bold';

		const divButton = document.createElement('div');
		divButton.classList.add('mt-2', 'btn-block')

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.classList.add('btn', 'btn-outline-danger', 'delete-btn');

		const readyButton = document.createElement('button');
		readyButton.textContent = 'Ready';
		readyButton.classList.add('btn', 'btn-outline-success', 'ml-2', 'ready-btn');

		const article = document.createElement('p');
		article.textContent = body;
		article.classList.add('mt-2', 'w-100');

		li.appendChild(divWrapper);
		divWrapper.appendChild(span);
		divWrapper.appendChild(divButton);
		divButton.appendChild(deleteButton);
		divButton.appendChild(readyButton);
		li.appendChild(article);

		return li;
	}

	function onFormSubmitHandler(e) {
		e.preventDefault();
		const titleValue = inputTitle.value;
		const bodyValue = inputBody.value;

		if (!titleValue || !bodyValue) {
			alert('Please enter title and body!');
			return;
		}

		const task = createNewTask(titleValue, bodyValue);
		let listItem = listItemTemplate(task);
		checkOnEmptyList(objOfTasks);
		listContainer.insertAdjacentElement('afterbegin', listItem);
		form.reset();
	}

	function createNewTask(title, body) {
		const newTask = {
			title,
			body,
			completed: false,
			_id: `task-${Math.random()}`,
		}

		objOfTasks[newTask._id] = newTask;

		return { ...newTask };
	}

	function deleteTask(id) {
		const isConfirm = confirm('Really delete task?');
		if (!isConfirm) return isConfirm;
		delete objOfTasks[id];
		return isConfirm;
	}

	function deleteTaskFromHTML(confirmed, el) {
		if (!confirmed) return;
		el.remove();
		checkOnEmptyList(objOfTasks);
	}

	function onDeleteHandler({ target } = {}) {
		if (target.classList.contains('delete-btn')) {
			const parent = target.closest('[data-task-id]');

			const id = parent.dataset.taskId;
			const confirmed = deleteTask(id);

			deleteTaskFromHTML(confirmed, parent);
		}
	}

	function onReadyHandler({ target } = {}) {
		if (target.classList.contains('ready-btn')) {
			const parent = target.closest('[data-task-id]');
			const completed = parent.classList.toggle('completed');
			target.textContent = (completed) ? 'Done!' : 'Ready';
		}
	}


})(tasks);


