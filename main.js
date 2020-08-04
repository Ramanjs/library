function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages + ' pages';
    this.pagesRead = pagesRead;
}

const library = [];
const formElement = document.querySelector('form');
const booksContainer = document.querySelector('#books-container');
const addBookspan = document.querySelector('#open-modal');
const modal = document.querySelector('#modal');
const closespan = document.querySelector('.close');

addBookspan.addEventListener('click', openForm);
closespan.addEventListener('click', closeForm);
formElement.addEventListener('submit', addNewBook);

function addNewBook(e) {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let pagesRead = document.querySelector('#pages-read').value;
    let newBook = new Book(name, author, pages, pagesRead);
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
    let nameNode = getElement(book, 'p', 'title', 'book-name');
    let authorNode = getElement(book, 'p', 'author', 'book-author');
    let pagesNode = getElement(book, 'p', 'pages', 'book-pages');
    let editSpan = getElement(book, 'span', 'read', 'book-read');
    let deleteSpan = getElement(book, 'span', '', 'delete-button');
    deleteSpan.innerHTML = '&times;';
    deleteSpan.addEventListener('click', deleteBook);
    editSpan.addEventListener('click', editBook);
    bookNode.appendChild(deleteSpan);
    bookNode.appendChild(nameNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pagesNode);
    // bookNode.appendChild(readSpan);
    booksContainer.appendChild(bookNode);
}

function deleteBook() {
    let bookNode = this.parentNode;
    let index = parseInt(bookNode.dataset.index);
    library.splice(index, 1);
    bookNode.parentNode.removeChild(bookNode);
}

function editBook() {
    let bookNode = this.parentNode;
    let index = parseInt(bookNode.dataset.index);
    let bookObject = library[index];
    bookObject.read = bookObject.read === 'read' ? 'not read' : 'read';
    openForm();
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

function getElement(book, elem, property, className) {
    let element = document.createElement(elem);
    if (book.hasOwnProperty(property)) {
        element.innerHTML = book[property];
    }
    if (className) {
        element.classList.add(className);
    }
    return element;
}

const pages = document.querySelector('#pages');
const pagesRead = document.querySelector('#pages-read');

pages.addEventListener('change', () => {
    pagesRead.max = pages.value;
})