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

formSelector.addEventListener("submit", (event) => {
  addBookToLibrary(event);
  event.preventDefault();
  formSelector.reset();
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
  // const bookIndex = myLibrary.indexOf(newBook);

  myLibrary.push(newBook);
  console.log(myLibrary);

  displayBooks();
}

function displayBooks() {
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((card) => card.remove());

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.setAttribute("id", `book${index}`);

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

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    const readCardBtn = document.createElement("button");
    readCardBtn.classList.add("read-btn");
    readCardBtn.textContent = "Reading status";

    const deletCardBtn = document.createElement("button");
    deletCardBtn.classList.add("delete-btn");
    deletCardBtn.textContent = "Delete";

    btnContainer.appendChild(readCardBtn);
    btnContainer.appendChild(deletCardBtn);
    bookDiv.appendChild(btnContainer);

    booksContainer.appendChild(bookDiv);

    deletCardBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });

    readCardBtn.addEventListener("click", () => {
      if (readP.textContent === "Read.") {
        readP.textContent = "Not read yet.";
      } else {
        readP.textContent = "Read.";
      }
    });
  });
}

console.log(myLibrary);
