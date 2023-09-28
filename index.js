const addBook = document.querySelector('.add-book');
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

//Update the Read books count
function updateReadCount() {
    readNum.textContent = readCount;
}

//Update the Unread books count
function updateUnreadCount() {
    unreadNum.textContent = unreadCount;
}

//create a book card for each book
function makeBookCard(newBook) {
        const bookCard = document.createElement('div');
        const hTwo = document.createElement('h2');
        const para1 = document.createElement('p');
        const para2 = document.createElement('p');
        const bookButtons = document.createElement('div');
        const readAndCheck = document.createElement('div');
        const readButton = document.createElement('button');
        const readCheck = document.createElement('img');
        const deleteButt = document.createElement('button');
        const trash = document.createElement('img');

        bookCard.classList.add('card');
        para1.classList.add('para')
        para2.classList.add('para')
        bookButtons.classList.add('card-buttons');
        readAndCheck.classList.add('read-check');
        readButton.classList.add('read-status', 'unread');
        readCheck.classList.add('checkmark');
        deleteButt.classList.add('delete');
        trash.classList.add('trash');

        hTwo.textContent = newBook.title;
        para1.textContent = 'By:  ' + newBook.author;
        para2.textContent = 'Pages:  ' + newBook.pages;
        readButton.textContent = 'Read';

        readCheck.setAttribute('src', './images/check-bold.svg');
        trash.setAttribute('src', './images/trash-can-outline.svg');

        cardContainer.appendChild(bookCard);
        bookCard.appendChild(hTwo);
        bookCard.appendChild(para1);
        bookCard.appendChild(para2);
        bookCard.appendChild(bookButtons);
        bookButtons.appendChild(readAndCheck);
        readAndCheck.appendChild(readButton);
        readAndCheck.appendChild(readCheck);
        bookButtons.appendChild(deleteButt);
        deleteButt.appendChild(trash);

        //Read button - changes background and adds a check on 'read' cards
        function readUnread(event) {
            if(event.target.classList.contains('unread')) {
            readCheck.style.display = 'block';   
            bookCard.style.backgroundColor = 'var(--clr-bg-lt-blue)';
            event.target.classList.remove('unread');
            event.target.classList.add('read');
            readCount++;
            updateReadCount();
            unreadCount--;
            updateUnreadCount();
            } 
            else if(event.target.classList.contains('read')) {
            readCheck.style.display = 'none';   
            bookCard.style.backgroundColor = 'var(--clr-bg-lt)';
            event.target.classList.remove('read');
            event.target.classList.add('unread');
            unreadCount++;
            updateUnreadCount();
            readCount--;
            updateReadCount();
            } 
        }

        //Delete book when button is clicked
        function deleteBook(event) {  
            console.log('delete')    //this is logging
            if (event.target.classList.contains('delete')) {
                bookCard.remove(); //this is not happening - is it because it's still inside the function where it's being created? It doesn't work outside the function either...
            } //need to update read or unread - how do I find the status? 
        }

        readButton.addEventListener('click', readUnread);
        deleteButt.addEventListener('click', deleteBook);   
}



//Add book info from the form input and add it to the library array
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
        title: capitalize(bookTitle.value), 
        author: capitalize(bookAuthor.value),  
        pages: bookPages.value
    }

    library.push(newBook);
    form.reset();
    makeBookCard(newBook);
    unreadCount++; 
    updateUnreadCount(); 
}

//Capitalize the first letter of each word for the Title and Author
function capitalize(string) {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

addBook.addEventListener('click', addNewBook);