function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

const library = [];
const newBookForm = document.querySelector('#new-book-form');
const booksContainer = document.querySelector('#books-container');
const addBookButton = document.querySelector('#open-modal');
const newBookModal = document.querySelector('#new-book-modal');
const closespan = document.querySelector('#new-book-close');

addBookButton.addEventListener('click', openNewBookForm);
closespan.addEventListener('click', closeNewBookForm);
newBookForm.addEventListener('submit', addNewBook);

function openNewBookForm() {
    newBookModal.style.display = 'block';
}

function closeNewBookForm() {
    newBookModal.style.display = 'none';
}

function addNewBook(e) {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let pagesRead = document.querySelector('#pages-read').value;
    let newBook = new Book(name, author, pages, pagesRead);
    library.push(newBook);
    render();
    newBookForm.reset();
    closeNewBookForm();
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
    pagesNode.innerHTML += ' pages';
    
    let editProgress = getElement(book, 'span', '', 'book-status');
    
    let deleteSpan = getElement(book, 'span', '', 'delete-button');
    
    let progress = (Number(book.pagesRead) / Number(book.pages)) * 100;
    progress = roundOffToOneDecimal(progress);
    
    editProgress.innerText = `${progress}% Complete`;
    editProgress.addEventListener('click', editBook);
    
    let gradient = `linear-gradient(90deg, #AEFBAE, #AEFBAE ${progress}%, white ${progress}%, white 100%)`;
    bookNode.style.background = gradient;
    
    deleteSpan.innerHTML = '&times;';
    deleteSpan.addEventListener('click', deleteBook);
    
    bookNode.appendChild(deleteSpan);
    bookNode.appendChild(nameNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pagesNode);
    bookNode.appendChild(editProgress);
    booksContainer.appendChild(bookNode);
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

function deleteAllBooks() {
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.lastChild);
    }
}

function deleteBook() {
    let bookNode = this.parentNode;
    let index = parseInt(bookNode.dataset.index);
    library.splice(index, 1);
    render();
}

const editBookForm = document.querySelector('#edit-book-form');
const editFormModal = document.querySelector('#edit-book-modal');
const closeEditSpan = document.querySelector('#edit-book-close');
let bookIndex = 0;

editBookForm.addEventListener('submit', saveEdit);
closeEditSpan.addEventListener('click', closeEditForm);

function openEditForm() {
    editFormModal.style.display = 'block';
}

function closeEditForm() {
    editFormModal.style.display = 'none';
}

function editBook() {
    let bookNode = this.parentNode;
    bookIndex = parseInt(bookNode.dataset.index);
    let bookObject = library[bookIndex];
    openEditForm();
    editBookForm[0].max = bookObject.pages;
}

const pages = document.querySelector('#pages');
const pagesRead = document.querySelector('#pages-read');

pages.addEventListener('change', () => {
    pagesRead.max = pages.value;
});

function saveEdit(event) {
    event.preventDefault();
    let pagesRead = editBookForm[0].value;
    library[bookIndex].pagesRead = pagesRead;
    editBookForm.reset();
    closeEditForm();
    render();
}

function roundOffToOneDecimal(number) {
    return Math.round(number * 10) / 10;
}