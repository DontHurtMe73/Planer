let form = document.querySelector('#addForm');
let itemsList = document.querySelector('#items');
let inputForm = document.querySelector("#newItemText");
let newItemText;
let searchInput = document.querySelector('#filter');


//local Storage
let todos;
function toLocal() {
   todos = itemsList.innerHTML;
   localStorage.setItem('test', todos)
}

if (localStorage.getItem('test')) {
   itemsList.innerHTML = localStorage.getItem('test')
}

//Listeners
form.addEventListener('submit', addItem);
itemsList.addEventListener('click', remove);
searchInput.addEventListener('keyup', search);

//Invite task
function addItem(e) {
   e.preventDefault();
   newItemText = inputForm.value;
   if (newItemText === '') {
      return
   }
   let newTemplate = `
   <li class="list-group-item">
      ${newItemText}
      <button data-action="delete" type="button" class="btn btn-light btn-sm float-right">
         Удалить
      </button>
   </li>`;
   itemsList.insertAdjacentHTML("afterbegin", newTemplate);
   toLocal()
   inputForm.value = "";
}

//Delete task
function remove(e) {
   if (e.target.getAttribute('data-action') == 'delete') {
      if (confirm('Точно удалить задачу?')) {
         e.target.parentNode.remove()
         toLocal()
      }
   }
}

//Search task
function search(e) {
   let searchedText = e.target.value.toLowerCase();
   let items = itemsList.querySelectorAll('li');
   items.forEach(function (item) {
      let itemText = item.firstChild.textContent.toLowerCase();
      if (itemText.includes(searchedText)) {
         item.style.display = "block";
      } else {
         item.style.display = "none";
      }
   })
}