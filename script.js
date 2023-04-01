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
let icon;
let trashButtons;

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
  myLibrary = [];
  updateCounters();
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
const Book = function (title, author, pages, read, id) {
  this.id = generateUniqueId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// Function that generates IDs
function generateUniqueId() {
  let id = "";
  const chars = "abcdef0123456789";
  for (let i = 0; i < 32; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    id += chars[randIndex];
    if (i === 7 || i === 11 || i === 15 || i === 19) {
      id += "-";
    }
  }
  return id;
}

// Function that adds book to the library array
function addBookToLibrary() {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.value
  );
  myLibrary.push(book);
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
  icon = document.createElement("ion-icon");
  icon.setAttribute("name", "trash");
  icon.setAttribute("class", "trash");
  tdRemove.appendChild(icon);

  trashButtons = document.querySelectorAll('[name="trash"]');

  // Adds an event listener to each trash button.
  addTrashEvents();
}

// Function that displays books on the table
function displayBooks() {
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    // Giving the same id to the table row and the trash icon as the book to link between the 3
    tr.setAttribute("data-id", `${myLibrary[i].id}`);
    icon.setAttribute("data-id", `${myLibrary[i].id}`);

    // Displaying book details on the table (title, author, pages)
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

// Function that adds event listeners to the trash buttons
function addTrashEvents() {
  for (let i = 0; i < trashButtons.length; i++) {
    trashButtons[i].addEventListener("click", function () {
      const bookId = this.closest("tr").getAttribute("data-id");
      deleteBook(bookId);
      updateCounters();
    });
  }
}

// Function that deletes corresponding book
function deleteBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  const deleteTr = document.querySelector(`[data-id="${bookId}"]`);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    deleteTr.remove();
  }
}

// Function that updates book counters (total books, books read, books not read)
function updateCounters() {
  allBooks = myLibrary.length;
  allBooksEl.textContent = allBooks;

  readBooks = myLibrary.reduce((acc, book) => {
    if (book.read === "yes") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  readBooksEl.textContent = readBooks;

  unreadBooks = myLibrary.reduce((acc, book) => {
    if (book.read === "no") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  unreadBooksEl.textContent = unreadBooks;
}

doneBtn.addEventListener("click", function () {
  addBookToLibrary();
  addRow();
  updateCounters();
  displayBooks();
  closeBookModal();
});
