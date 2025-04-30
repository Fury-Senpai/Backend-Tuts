let arr =[];
function addInput(){
    
    const inputElem = document.querySelector('.js-todo-name');
    const inputElemVal = inputElem.value;
    const dateElem = document.querySelector('.js-todo-date');
    const dateVal = dateElem.value;

    if (inputElemVal === '' || dateVal === '') {
        alert('Please fill both fields!');
        return;
      };

    //Backend
    fetch('/add-todo',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name:inputElemVal,date:dateVal})
    })
    .then(res=>res.json())
    .then(data=>{
        arr = data;
        renderTodo(data);
    })

};

function renderTodo(data){
    const resultElem = document.querySelector('.js-result');
    let str = '';
    data.forEach((todo,index)=>{
        str+= `<p class='result-para'>${todo.name}</p> <p>${todo.date}</p> <button class='todo-del-btn' onclick='deleteTodo(${index})'> Delete </button>`;
    });
    resultElem.innerHTML = str;
};

function deleteTodo(index){
    arr.splice(index,1);
    renderTodo(arr);

}

