let openAdd = document.getElementById('open-add');


let openPopUp = document.getElementById('open-input');
let closePopUp =document.getElementById('close-pop-up');
let closePopUpEdit =document.getElementById('close-pop-up-edit');

let add = document.getElementById('add-button');
let edit = document.getElementById('edit-button');

let todoTasks = document.getElementById('todo-list');
let doingTasks = document.getElementById('doing-list');
let finishTasks = document.getElementById('finish-list');
let todoCount = document.getElementById('todo-count-number');
let doingCount = document.getElementById('doing-count-number');
let finishCount = document.getElementById('finish-count-number');
let openPopUpEdit = document.getElementById('open-edit');
let groupbox = document.querySelectorAll('.choosetype');
let dtb = [
	// {
	// 	category:'lorem2',
	// 	title: 'lorem2',
	// 	content: 'lorem2',
	// 	date: 'lorem2',
	// 	type: 'todo'
	// },
	// {
	// 	category:'lorem2',
	// 	title: 'lorem2',
	// 	content: 'lorem2',
	// 	date: 'lorem2',
	// 	type: 'doing'
	// },
	// {
	// 	category:'lorem23',
	// 	title: 'lorem23',
	// 	content: 'lorem23',
	// 	date: 'lorem23',
	// 	type: 'done'
	// }
];
if (localStorage.getItem('task') == null) {
	localStorage.setItem('task', JSON.stringify(dtb));
} else {
	data = JSON.parse(localStorage.getItem('task'));
}

openAdd.addEventListener('click', function() 
{
    openPopUp.classList.add('enable');
    add = document.getElementById('add-button');
})
closePopUp.addEventListener('click', function()
{
    openPopUp.classList.remove('enable');
    
})
closePopUpEdit.addEventListener('click', function()
{
    openPopUpEdit.classList.remove('enable');
    
})
add.addEventListener('click', function()
{
    var category = document.getElementById('add-category').value;
   
    var title = document.getElementById('add-title').value;
    var content = document.getElementById('add-content').value;
    // category.innerHTML ='';
    // title.innerHTML ='';
    // content.innerHTML ='';


    var date =  new Date().getTime();

    if( category  == '' ) {
        document.getElementById('add-category').classList.add('lackInformation');
    }   
    else if(category != '' && document.getElementById('add-category').classList.contains('lackInformation'))  
    {
        document.getElementById('add-category').classList.remove('lackInformation');
    }
    if( title  == '' ) {
        document.getElementById('add-title').classList.add('lackInformation');
    }   
    else if(title != '' && document.getElementById('add-title').classList.contains('lackInformation'))  
    {
        document.getElementById('add-title').classList.remove('lackInformation');
    }
    if( content  == '' ) {
        document.getElementById('add-content').classList.add('lackInformation');
    }   
    else if(content != '' && document.getElementById('add-content').classList.contains('lackInformation'))  
    {
        document.getElementById('add-content').classList.remove('lackInformation');
    }
    if(category != '' && title != '' && content != '' )
    {
        let task =
        {
            category: category,
		    title: title,
		    content: content,
		    date: date,
		    type: 'todo'
        }
        dtb.push(task);
        pushTask();
        openPopUp.classList.remove('enable');
        localStorage.setItem('task', JSON.stringify(dtb));
    }
});
function pushTask()
{
    let TodoCount = 0, DoingCount = 0, FinishCount = 0;
    todoTasks.innerHTML = '';
    doingTasks.innerHTML = '';
    finishTasks.innerHTML = '';
    dtb.forEach(function(task, index)
    {
        if(task.type == 'todo')
        {
            TodoCount++;
            todoTasks.innerHTML +=
            `
            <div class="todo-task">
							<div class="task-header">
								<span class="category">${task.category}</span>
								<div class="action">
									<img src="./pictures/Edit.png" alt="" class="edit" onclick="editTask(${index})">
									<img src="./pictures/Delete.png" alt="" class="delete" onclick ="remove(${index})" >
								</div>
							</div>
								<div class="task-body">
									<p class="task-title">${task.title}</p>
									<div class="task-line"></div>
									<p class="task-content">${task.content}</p>
									<div class="task-time">
										<img src="./pictures/Vector.png" alt="" class="clock">
										<p class="time">${task.Date}</p>
									</div>
								</div>
						</div>
            `;
            todoCount.innerHTML = TodoCount;
        }
        else if (task.type == 'doing')
        {
            DoingCount++;
            doingTasks.innerHTML += 
            `
            <div class="todo-task">
							<div class="task-header">
								<span class="category">${task.category}</span>
								<div class="action">
									<img src="./pictures/Edit.png" alt="" class="edit" onclick="editTask(${index})">
									<img src="./pictures/Delete.png" alt="" class="delete" onclick="remove(${index})">
								</div>
							</div>
								<div class="task-body">
									<p class="task-title">${task.title}</p>
									<div class="task-line"></div>
									<p class="task-content">${task.content}</p>
									<div class="task-time">
										<img src="./pictures/Vector.png" alt="" class="clock">
										<p class="time">${task.Date}</p>
									</div>
								</div>
						</div>
            `;
            doingCount.innerHTML = DoingCount;
        }
        else if (task.type == 'done')
        {
            FinishCount++;
            finishTasks.innerHTML +=
            `
            <div class="todo-task">
							<div class="task-header">
								<span class="category">${task.category}</span>
								<div class="action">
									<img src="./pictures/Edit.png" alt="" class="edit" onclick="editTask(${index})">
									<img src="./pictures/Delete.png" alt="" class="delete" onclick="remove(${index})">
								</div>
							</div>
								<div class="task-body">
									<p class="task-title">${task.title}</p>
									<div class="task-line"></div>
									<p class="task-content">${task.content}</p>
									<div class="task-time">
										<img src="./pictures/Vector.png" alt="" class="clock">
										<p class="time">${task.Date}</p>
									</div>
								</div>
						</div>
            `;
            finishCount.innerHTML = FinishCount;
        }
    })

}
function option(index)
{
    for(var i =0 ; i < 3; i++){
        groupbox[i].checked = false;
    }
    groupbox[index].checked = true;
}
let current = 0;
function editTask(index)
{
     current = index;
    openPopUpEdit.classList.add('enable');
    document.getElementById('edit-title').value = dtb[index].title;
	document.getElementById('edit-content').value = dtb[index].content;
	document.getElementById('edit-category').value = dtb[index].category;
    switch(dtb[index].type)
    {
        case 'todo':
            option(0);
            break;
        case 'doing':
            option(1);
            break;
        case 'done':
            option(2);
            break;
    }

}


edit.addEventListener('click', function() {
	let category = document.getElementById('edit-category').value;
    let title = document.getElementById('edit-title').value;
	let content = document.getElementById('edit-content').value;
	let date =  new Date().getTime();
    let type = '';
    for(var i =0 ; i < groupbox.length; i++){
		if(groupbox[i].checked == true) type = groupbox[i].value;
    }
    if( category  == '' ) {
        document.getElementById('edit-category').classList.add('lackInformation');
    }   
    else if(category != '' && document.getElementById('edit-category').classList.contains('lackInformation'))  
    {
        document.getElementById('edit-category').classList.remove('lackInformation');
    }
    if( title  == '' ) {
        document.getElementById('edit-title').classList.add('lackInformation');
    }   
    else if(title != '' && document.getElementById('edit-title').classList.contains('lackInformation'))  
    {
        document.getElementById('edit-title').classList.remove('lackInformation');
    }
    if( content  == '' ) {
        document.getElementById('edit-content').classList.add('lackInformation');
    }   
    else if(content != '' && document.getElementById('edit-content').classList.contains('lackInformation'))  
    {
        document.getElementById('edit-content').classList.remove('lackInformation');
    };
    if( title != '' && content != '' && category != '') {
		let task = {
			category: category,
			title: title,
			content: content,
			date: date,
			type: type
		}
        dtb[current] = task;
        pushTask();
        openPopUpEdit.classList.remove('enable');
        localStorage.setItem('task',JSON.stringify(data));
    }
    

})



function remove(val){
	dtb.splice(val,1);
	pushTask();
	localStorage.setItem('task',JSON.stringify(dtb));
}

