"use strict";

const cardContainer = document.querySelector(".cards-container");
console.log(cardContainer);
const addNewBook = document.createElement("button");
addNewBook.classList.add("showDialog");
addNewBook.innerText = "New Book";

const booksContainer = document.getElementById("books-container");

const formSelector = document.getElementById("books-form");
const mainTitle = document.querySelector(".main-title");

const dialogModal = document.createElement("dialog");
dialogModal.classList.add("dialogModal");

const confirmBtn = document.querySelector(".confirm-btn");

formSelector.after(addNewBook);
dialogModal.appendChild(formSelector);
mainTitle.after(dialogModal);

const myLibrary = [];

addNewBook.addEventListener("click", () => {
  dialogModal.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  addBookToLibrary(event);
  event.preventDefault();
  dialogModal.close();
});

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(event) {
  event.preventDefault();

  const bookName = document.getElementById("name").value;
  console.log(bookName);
  const bookAuthor = document.getElementById("author").value;
  console.log(bookAuthor);
  const bookPages = document.getElementById("pages").value;
  console.log(bookPages);
  const bookRead = document.getElementById("read").checked;
  console.log(bookRead);

  const newBook = new Book(bookName, bookAuthor, bookPages, bookRead);

  console.log(newBook.info());

  myLibrary.push(newBook);
  console.log(myLibrary);

  displayBooks();
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");

    const nameP = document.createElement("p");
    nameP.textContent = book.name;
    bookDiv.appendChild(nameP);

    const authorP = document.createElement("p");
    authorP.textContent = book.author;
    bookDiv.appendChild(authorP);

    const pagesP = document.createElement("p");
    pagesP.textContent = book.pages;
    bookDiv.appendChild(pagesP);

    const readP = document.createElement("p");
    readP.textContent = `${book.read ? "Read." : "Not read yet."}`;
    bookDiv.appendChild(readP);

    cardContainer.appendChild(bookDiv);
  }
}

console.log(myLibrary);
