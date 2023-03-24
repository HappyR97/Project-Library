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

// Book Variables
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const bookRead = document.querySelector(".book-read");
const checkmark = document.querySelector(".check");

// Table Variables

let tr;
let tdTitle;
let tdAuthor;
let tdPages;
let tdRead;
let tdRemove;

// ***** MODALS ***** //

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

// Events to open/close delete all modal

deleteAllBtn.addEventListener("click", function () {
  openDeleteModal();
});

deleteCloseBtn.addEventListener("click", function () {
  closeDeleteModal();
});

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

//////////////////////////////////////////////

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
}

// ********** TEST ********** //

const book1 = new Book("Atomic Habits", "James Clear", 189, true);
const book2 = new Book("48 Laws of Power", "Robert Green", 245, false);
const book3 = new Book(
  "The Subtle Art of Not Giving a Fuck",
  "Mark Manson",
  574,
  true
);
const book4 = new Book("The Laws of Human Nature", "Robert Greene", 564, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

console.log(myLibrary);

// Function that adds a new row to the library table
function addRow() {
  tr = document.createElement("tr");
  tdTitle = document.createElement("td");
  tdAuthor = document.createElement("td");
  tdPages = document.createElement("td");
  tdRead = document.createElement("td");
  tdRemove = document.createElement("td");

  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdPages);
  tr.appendChild(tdRead);
  tr.appendChild(tdRemove);

  table.appendChild(tr);
}

function displayBooks() {
  for (let i = 0; i <= myLibrary.length - 1; i++) {
    addRow();
    tdTitle.textContent = myLibrary[i].title;
    tdAuthor.textContent = myLibrary[i].author;
    tdPages.textContent = myLibrary[i].pages;
    tdTitle.textContent = myLibrary[i].title;
  }
}

displayBooks();

// ******************** //

doneBtn.addEventListener("click", function () {
  addBookToLibrary();
  closeBookModal();
});
