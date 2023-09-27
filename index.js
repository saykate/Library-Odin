const addBook = document.querySelector('.add-book');
const readStatus = document.querySelectorAll('.read-status');
const deleteBk = document.querySelectorAll('.delete');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookCard = document.querySelectorAll('.card');
let form = document.querySelector('form')

const library = [];

//can an empty div exist with a button?! How will I add the "By", "Pages", the button?!
//add inputs to h2, p, p, button. Append them to a div
//Why do I loop through the array? Am I not creating each one as it's being input?

function addNewBook(e) {
    e.preventDefault();
    bookInput = new FormData(form);
    
}

function readUnread(event) {
    const thisCard = event.target.closest('.card');

    if (thisCard) {
        const thisCheck = thisCard.querySelector('.checkmark');

        if(event.target.classList.contains('unread')) {
        thisCheck.style.display = 'block';   
        thisCard.style.backgroundColor = 'var(--clr-bg-lt-blue)';
        event.target.classList.remove('unread');
        event.target.classList.add('read');
    } 
        else if(event.target.classList.contains('read')) {
        thisCheck.style.display = 'none';   
        thisCard.style.backgroundColor = 'var(--clr-bg-lt)';
        event.target.classList.remove('read');
        event.target.classList.add('unread');
    } 
}
}

//when the .card is being created dynamically, I may need to move this into main or something...
function deleteBook(event) {
    const thisCard = event.target.closest('.card');

    if (thisCard) {
  if (event.target.classList.contains('delete')) {
    thisCard.remove();
  }
}
}

addBook.addEventListener('click', addNewBook);

readStatus.forEach(status => {
    status.addEventListener('click', readUnread);
})

deleteBk.forEach(delBk => {
    delBk.addEventListener('click', deleteBook);
})