const draggable_list = document.querySelector("#draggable-list");
const check = document.querySelector("#check");


const richestPeople = [
  'Elon Musk',
  'Jeff Bezos',
  'Mask Zuckerberg',
  'Bill Gates',
  'Warrent Buffet',
];

//store listItems
const listItems = [];

let dragStartIndex = 0;

//Insert list items into DOM
createList();
function createList() {
  [...richestPeople]
  .map(a => ({value: a, sort: Math.random()})) // return obj {value: name, sort: Math.random()}
  .sort((a,b) => (a.sort - b.sort)) // sort array according to sort
  .map(a => a.value) // just return name without sort
  .forEach((person, index) => {
    // create li element
    const listItem = document.createElement('li');
    listItem.setAttribute("data-index", index);
    listItem.innerHTML = `
      <span class="number">${index + 1}.&nbsp;</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class='bx bx-sort' ></i>
      </div>
    `;

    // push li item into listItems and insert into DOM
    listItems.push(listItem);
    draggable_list.appendChild(listItem);
  });

  dragDropEvents();
};

function dragDropEvents() {
  const draggableItems = document.querySelectorAll(".draggable-list li");
  const draggables = document.querySelectorAll(".draggable");

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  });

  draggableItems.forEach(item => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragStart() {
  dragStartIndex =+ this.closest('li').getAttribute('data-index');
}


function dragEnter() {
  this.classList.add("over");

}

function dragOver(e) {
  e.preventDefault();
}


function dragLeave() {
  this.classList.remove("over");

}

function dragDrop() {
  const dragEndIndex =+ this.getAttribute('data-index');
  this.classList.remove("over");
  swapItems(dragStartIndex, dragEndIndex);
}

// Swap list Item that are drag and drop 
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");


  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check the order of lists
function checkOrder() {
  listItems.forEach((item, index) => {
    const personName = item.querySelector(".person-name").innerText.trim();

    if(personName !== richestPeople[index]) {
      item.classList.remove("wrong", "right");
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong", "right");
      item.classList.add("right");
    }
  });
}


check.addEventListener('click', checkOrder);
