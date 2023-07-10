let counter = 0;
let bookList = [];
const form = document.querySelector('form');
const contactUs = document.querySelector('.contactUs');
const booksSection = document.querySelector('#book-section');
const bookListElement = document.querySelector('#book-list');
const contBtn = document.querySelector('#contBtn');
const listBtn = document.querySelector('#listBtn');
const AddNewBtn = document.querySelector('#AddNewBtn');
const bookStorageName = 'booklist';

function hideAll() {
  if (!contactUs.classList.contains('hidden')) { contactUs.classList.add('hidden'); }

  if (!booksSection.classList.contains('hidden')) { booksSection.classList.add('hidden'); }

  if (!form.classList.contains('hidden')) { form.classList.add('hidden'); }
}

hideAll();
booksSection.classList.toggle('hidden');

contBtn.addEventListener('click', () => {
  hideAll();
  contactUs.classList.toggle('hidden');
});

listBtn.addEventListener('click', () => {
  hideAll();
  booksSection.classList.toggle('hidden');
});

AddNewBtn.addEventListener('click', () => {
  hideAll();
  form.classList.toggle('hidden');
});

const currentDate = document.querySelector('.date');
setInterval(() => {
  const d = new Date();
  currentDate.innerHTML = `${d.toDateString()} ${d.toLocaleTimeString()}`;
}, 1000);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.newBookList = [];
  }

  saveData() {
    this.newBookList = [];
    bookList.forEach((book) => {
      this.newBookList.push({ title: book.title, author: book.author });
    });
    localStorage.setItem(bookStorageName, JSON.stringify(this.newBookList));
  }

  addBook() {
    counter += 1;
    const divBook = document.createElement('div');
    if (counter % 2 === 1) {
      divBook.className = 'book';
    } else {
      divBook.className = 'book bg-white';
    }
    const titleHeader = document.createElement('label');
    titleHeader.className = 'title';
    titleHeader.textContent = `"${this.title}" by ${this.author}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'btn btn-remove';
    removeBtn.book = this; //  store the book object as a property of the remove button
    removeBtn.addEventListener('click', () => {
      this.removeBook();
    });
    divBook.appendChild(titleHeader);
    divBook.appendChild(removeBtn);
    bookListElement.appendChild(divBook);
  }

  removeBook() {
    const index = bookList.indexOf(this);
    bookList = bookList.filter((_book) => _book !== this);
    this.saveData();
    bookListElement.removeChild(bookListElement.childNodes[index]);
    // Recolor
    counter = 0;
    bookListElement.childNodes.forEach((element) => {
      counter += 1;
      if (counter % 2 === 1) {
        element.className = 'book';
      } else {
        element.className = 'book bg-white';
      }
    });
  }

  renderBookList() {
    const storedvalue = localStorage.getItem(bookStorageName);
    bookListElement.textContent = '';
    bookList = [];
    if (storedvalue !== null) {
      this.newBookList = JSON.parse(storedvalue);
      this.newBookList.forEach((book) => {
        bookList.push(new Book(book.title, book.author));
      });
    }
    bookList.forEach((book) => {
      book.addBook();
    });
  }
}

new Book('', '').renderBookList();

//  add an event listener to the form submit button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const author = document.querySelector('#author').value.trim();
  if (title !== '' && author !== '') {
    const book = new Book(title, author);
    book.addBook();
    bookList.push(book);
    book.saveData();
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
});
