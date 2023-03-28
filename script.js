"use strict";

const bookModal = document.querySelector(".book-modal");
const deleteModal = document.querySelector(".delete-modal");
const overlay = document.querySelector(".overlay");
const addBtn = document.querySelector(".book-button--add");
const deleteAllBtn = document.querySelector(".book-button--delete");
const bookCloseBtn = document.querySelector(".book-button--close");
const deleteCloseBtn = document.querySelector(".delete-close-button");
const doneBtn = document.querySelector(".submit");
const table = document.querySelector(".table");
const deleteBtnNo = document.querySelector(".button-no");
const deleteBtnYes = document.querySelector(".button-yes");

// Book Variables
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const bookRead = document.querySelector(".book-read");

// Table Variables
let tr;
let tdTitle;
let tdAuthor;
let tdPages;
let tdRead;
let tdRemove;

// variable that holds table rows
const temp = document.getElementsByClassName("temp");

// Book counter variables

const readBooksEl = document.querySelector(".books-read");
const unreadBooksEl = document.querySelector(".books-unread");
const allBooksEl = document.querySelector(".books-all");

let readBooks = 0;
let unreadBooks = 0;
let allBooks = 0;

// ***** MODALS ***** //

// Function to open and close book modal
function openBookModal() {
  bookModal.classList.add("active");
  overlay.classList.add("active");
}

function closeBookModal() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookModal.classList.remove("active");
  overlay.classList.remove("active");
}

// Function to open and close delete all modal

function openDeleteModal() {
  deleteModal.classList.add("active");
  overlay.classList.add("active");
}

function closeDeleteModal() {
  deleteModal.classList.remove("active");
  overlay.classList.remove("active");
}

// Function that deletes all books

function deleteAll() {
  for (let i = 0; i < temp.length; i++) {
    if (temp[i]) {
      temp[i].remove();
    }
  }

  // Reset everything
  myLibrary = [];
  readBooks = 0;
  readBooksEl.textContent = "0";

  unreadBooks = 0;
  unreadBooksEl.textContent = "0";

  allBooks = 0;
  allBooksEl.textContent = "0";
}

// Events to open/close new book modal
addBtn.addEventListener("click", function () {
  openBookModal();
});

bookCloseBtn.addEventListener("click", function () {
  closeBookModal();
});

overlay.addEventListener("click", function () {
  closeBookModal();
  closeDeleteModal();
});

// Events to open/close "delete all" modal

deleteAllBtn.addEventListener("click", function () {
  openDeleteModal();
});

deleteCloseBtn.addEventListener("click", function () {
  closeDeleteModal();
});

deleteBtnNo.addEventListener("click", function () {
  closeDeleteModal();
});

// Event that deletes all books

deleteBtnYes.addEventListener("click", function () {
  for (let i = 0; i < 20; i++) {
    deleteAll();
  }
  closeDeleteModal();
});

// ******************************************************** //

// Library that will store all books objects
let myLibrary = [];

// Book constructor
const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// Function that adds book to the library array
function addBookToLibrary() {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.value
  );
  myLibrary.push(book);

  // Updating book counters
  allBooks += 1;
  allBooksEl.textContent = allBooks;
  if (bookRead.value === "yes") {
    readBooks += 1;
    readBooksEl.textContent = readBooks;
  } else {
    unreadBooks += 1;
    unreadBooksEl.textContent = unreadBooks;
  }
}

// Function that adds a new row to the library table
function addRow() {
  tr = document.createElement("tr");
  tdTitle = document.createElement("td");
  tdAuthor = document.createElement("td");
  tdPages = document.createElement("td");
  tdRead = document.createElement("td");
  tdRemove = document.createElement("td");

  tr.classList.add("temp");

  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdPages);
  tr.appendChild(tdRead);
  tr.appendChild(tdRemove);

  table.appendChild(tr);

  // Insert trash icon
  const icon = document.createElement("ion-icon");
  icon.setAttribute("name", "trash");
  icon.setAttribute("class", "trash");
  tdRemove.appendChild(icon);
}

// Function that displays books on the table
function displayBooks() {
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    tdTitle.textContent = myLibrary[i].title;
    tdAuthor.textContent = myLibrary[i].author;
    tdPages.textContent = myLibrary[i].pages;
    tdTitle.textContent = myLibrary[i].title;
    // If/Else statement that checks if book is read or not and inserts corresponding icon
    if (myLibrary[i].read === "yes") {
      // If book is read, insert Checkmark icon
      tdRead.innerHTML = ""; // Clears the "Read" cell first to avoid duplication of icon
      let check = document.createElement("ion-icon");
      check.setAttribute("name", "checkmark-circle");
      check.setAttribute("class", "check");

      tdRead.appendChild(check);

      // If book is NOT read, insert Cross icon
    } else {
      tdRead.innerHTML = ""; // Clears the "Read" cell first to avoid duplication of icon
      let cross = document.createElement("ion-icon");
      cross.setAttribute("name", "close-circle");
      cross.setAttribute("class", "cross");
      tdRead.appendChild(cross);
    }
  }
}

doneBtn.addEventListener("click", function () {
  addBookToLibrary();
  addRow();
  displayBooks();
  closeBookModal();
});
