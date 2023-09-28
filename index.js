const addBook = document.querySelector('.add-book');
const readStatus = document.querySelectorAll('.read-status');
const deleteBk = document.querySelectorAll('.delete');
const readNum = document.querySelector('.read-num');
const unreadNum = document.querySelector('.unread-num');
const cardContainer = document.querySelector('.card-container')
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const library = [];

let form = document.querySelector('form'); //should this be let or const?
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

//create a book card for each book
function makeBookCard() {
    library.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        const hTwo = document.createElement('h2');
        hTwo.textContent = book.title;
        const para1 = document.createElement('p');
        para1.textContent = 'By:  ' + book.author;
        para1.classList.add('para')
        const para2 = document.createElement('p');
        para2.textContent = 'Pages:  ' + book.pages;
        para2.classList.add('para')
        const bookButtons = document.createElement('div');
        bookButtons.classList.add('card-buttons');
        const readAndCheck = document.createElement('div');
        readAndCheck.classList.add('read-check');
        const readButton = document.createElement('button');
        readButton.textContent = 'Read';
        readButton.classList.add('read-status');
        readButton.classList.add('unread');
        const readCheck = document.createElement('img');
        readCheck.classList.add('checkmark');
        readCheck.setAttribute('src', './images/check-bold.svg');
        const deleteButt = document.createElement('button');
        deleteButt.classList.add('delete');
        const trash = document.createElement('img');
        trash.classList.add('trash');
        trash.setAttribute('src', './images/trash-can-outline.svg');
        deleteButt.appendChild(trash);

        cardContainer.appendChild(bookCard);
        bookCard.appendChild(hTwo);
        bookCard.appendChild(para1);
        bookCard.appendChild(para2);
        bookCard.appendChild(bookButtons);
        bookButtons.appendChild(readAndCheck);
        readAndCheck.appendChild(readButton);
        readAndCheck.appendChild(readCheck);
        bookButtons.appendChild(deleteButt);
    });
}

//add book info from the form input and add it to the library array
function addNewBook(e) {
    e.preventDefault();

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
    makeBookCard();
    unreadCount++; 
    updateUnreadCount(); 
}

//Read button - changes background and adds a check on 'read' cards
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