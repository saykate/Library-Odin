const addBook = document.querySelector('.add-book');
const readStatus = document.querySelectorAll('.read-status');
const deleteBk = document.querySelectorAll('.delete');
const readNum = document.querySelector('.read-num');
const unreadNum = document.querySelector('.unread-num');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
// const bookCard = document.querySelectorAll('.card');

let form = document.querySelector('form');
let readCount = 0;
let unreadCount = 0;

function updateReadCount() {
    console.log(readCount)
    readNum.textContent = readCount;
}

function updateUnreadCount() {
    console.log(unreadCount)
    unreadNum.textContent = unreadCount;
}

const library = [];

//add the "By:" & "Pages:" <p>'s and buttons to each card
//make sure new books have .unread class

function addNewBook(e) {
    e.preventDefault();
    console.log('add book clicked')
    if (bookTitle.value === '') {
        return alert('Please fill out Book Title');
    } else if (bookAuthor.value === '') {
        return alert('Please fill out Book Author');
    } else if (bookPages.value === '') {
        return alert('Please fill out Number of Pages');
    }

    const newBook = {
        title: bookTitle.value, 
        author: bookAuthor.value, 
        pages: bookPages.value
    }

    library.push(newBook);
    console.log(library);
    form.reset();
    unreadCount++; //will this go here or in the library card function?
    updateUnreadCount(); //will this go here or in the library card function?
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
        readCount++;
        updateReadCount();
        unreadCount--;
        updateUnreadCount();
    } 
        else if(event.target.classList.contains('read')) {
        thisCheck.style.display = 'none';   
        thisCard.style.backgroundColor = 'var(--clr-bg-lt)';
        event.target.classList.remove('read');
        event.target.classList.add('unread');
        unreadCount++;
        updateUnreadCount();
        readCount--;
        updateReadCount();
    } 
}
}

//not currently functioning
//when the .card is being created dynamically, I may need to move this into the function where it's being added (see hackathon project)
function deleteBook(event) {
    console.log('delete button clicked')
    const thisCard = event.target.closest('.card');

    if (thisCard) {
  if (event.target.classList.contains('delete')) {
    thisCard.remove();
  }
}  
//need to update read or unread - how do I find the status? 
  }

addBook.addEventListener('click', addNewBook);

readStatus.forEach(status => {
    status.addEventListener('click', readUnread);
})

deleteBk.forEach(delBk => {
    delBk.addEventListener('click', deleteBook);
})