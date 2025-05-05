const resElem = document.querySelector('.js-result');

function todoRender() {
    const inputElem = document.querySelector('.js-todo-name');
    const inputElemData = inputElem.value;
    const dateElem = document.querySelector('.js-todo-date');
    const dateElemData = dateElem.value;

    // POST request to create a file
    fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsname: inputElemData, jsDate: dateElemData })
    })
    .then(() => {
        // After creating, fetch the updated list
        return fetch('/path/file');
    })
    .then(res => res.json())
    .then(files => {
        let str = '';
        if (files.length > 0) {
            files.forEach((val) => {
                str += `<div class="task">
                    <h1 class="task-name">${val}</h1>
                    <a href="#" class="read-more">Read More</a>
                </div>`;
            });
            resElem.innerHTML = str;
        } else {
            str += `<h3 class="no-task">No task created..</h3>`;
            resElem.innerHTML = str;
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
}
todoRender();