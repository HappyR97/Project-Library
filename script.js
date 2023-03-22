"use strict";

const bookModal = document.querySelector(".book-modal");
const overlay = document.querySelector(".overlay");
const addBtn = document.querySelector(".book-button--add");
const bookCloseBtn = document.querySelector(".book-button--close");

// Events to open/close new book modal
addBtn.addEventListener("click", function () {
  openBookModal();
});

bookCloseBtn.addEventListener("click", function () {
  closeBookModal();
});

overlay.addEventListener("click", function () {
  closeBookModal();
});

// Function to open and close modal
function openBookModal() {
  bookModal.classList.add("active");
  overlay.classList.add("active");
}

function closeBookModal() {
  bookModal.classList.remove("active");
  overlay.classList.remove("active");
}
