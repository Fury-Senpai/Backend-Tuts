const elem = document.querySelector('.task-container');
function todoRender(){
    fetch('/path/files')
        .then(res => res.json())
        .then(files => {
            let str = '';
            if(files.length > 0){
                files.forEach((val)=>{
                    str += `<div class="task">
                        <h1 class="task-name">Some task goes here</h1>
                        <a href="#" class="read-more">Read More</a>
                    </div>`;
                })                
                elem.innerHTML = str;
            }
            else{
                str+= `<h3 class="no-task">No task created..</h3>`;
                elem.innerHTML = str;
            }
        })
        .catch(err=>{
            console.error('Error fetching tasks:',err);
            elem.innerHTML = `<h3 class="no-task">Error loading tasks.</h3>`;
        });
}

todoRender();