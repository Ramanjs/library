function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

const library = [];
const formElement = document.querySelector('#new-book-form');
const booksContainer = document.querySelector('#books-container');
const addBookspan = document.querySelector('#open-modal');
const modal = document.querySelector('#new-book-modal');
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
    render();
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

function deleteBook() {
    let bookNode = this.parentNode;
    let index = parseInt(bookNode.dataset.index);
    library.splice(index, 1);
    render();
}

const editBookForm = document.querySelector('#edit-book-form');
const editFormModal = document.querySelector('#edit-book-modal');
let bookIndex = 0;

editBookForm.addEventListener('submit', saveEdit);

function editBook() {
    let bookNode = this.parentNode;
    bookIndex = parseInt(bookNode.dataset.index);
    let bookObject = library[bookIndex];
    editFormModal.style.display = 'block';
    editBookForm[0].max = bookObject.pages;
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

function roundOffToOneDecimal(number) {
    return Math.round(number * 10) / 10;
}

function saveEdit(event) {
    event.preventDefault();
    let pagesRead = editBookForm[0].value;
    library[bookIndex].pagesRead = pagesRead;
    editBookForm.reset();
    editFormModal.style.display = 'none';
    render();
}