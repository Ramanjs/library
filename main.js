function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let bookInfo = `${this.title} by ${this.author}, ${this.pages} pages.`;
        return bookInfo;
    }
    this.readStatus = function() {
        return this.read ? 'Read' : 'Not Read';
    }
}

const library = [];

const formElement = document.querySelector('form');
const booksContainer = document.querySelector('#books-container');
const addBookspan = document.querySelector('#open-modal');
const modal = document.querySelector('#modal');
const closespan = document.querySelector('.close');
// const spans = Array.from(document.getElementsByTagName('span'));

addBookspan.addEventListener('click', openForm);
closespan.addEventListener('click', closeForm);
formElement.addEventListener('submit', addNewBook);
// spans.forEach(span => span.addEventListener('click', deleteBook));

function addNewBook(e) {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let newBook = new Book(name, author, pages, read);
    library.push(newBook);
    renderBook(newBook, library.length - 1);
    formElement.reset();
    closeForm();
}

function render() {
    deleteAllBooks();
    library.forEach((book, index) => {
        renderBook(book, index);
    });
}

function renderBook(book, index) {
    let bookNode = document.createElement('div');
    bookNode.classList.add('book');
    bookNode.setAttribute('data-index', index);
    let nameNode = document.createElement('p');
    let authorNode = document.createElement('p');
    let pagesNode = document.createElement('p');
    let readSpan = document.createElement('span');
    let deleteSpan = document.createElement('span');
    nameNode.innerText = book.title;
    nameNode.classList.add('book-name');
    authorNode.innerText = book.author;
    authorNode.classList.add('book-author');
    pagesNode.innerText = book.pages + " pages.";
    readSpan.innerText = book.readStatus();
    deleteSpan.innerHTML = '&times;';
    deleteSpan.setAttribute('id', 'delete-button');
    deleteSpan.addEventListener('click', deleteBook)
    readSpan.addEventListener('click', toggleReadStatus);
    bookNode.appendChild(deleteSpan);
    bookNode.appendChild(nameNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pagesNode);
    bookNode.appendChild(readSpan);
    booksContainer.appendChild(bookNode);
}

function deleteBook() {
    let bookNode = this.parentNode;
    let index = parseInt(bookNode.dataset.index);
    library.splice(index, 1);
    bookNode.parentNode.removeChild(bookNode);
}

function toggleReadStatus() {
    let bookNode = this.parentNode;
    let index = parseInt(bookNode.dataset.index);
    let bookObject = library[index];
    bookObject.read = bookObject.read ? false : true;
    render();
}

function deleteAllBooks() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

function openForm() {
    modal.style.display = 'block';
}

function closeForm() {
    modal.style.display = 'none';
}