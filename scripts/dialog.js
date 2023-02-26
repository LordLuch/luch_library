document.addEventListener("DOMContentLoaded", () => {
  let bookstoreImage = document.getElementById("bookstore_image"),
  bookstoreDialog = document.getElementById("bookstore_dialog");

  bookstoreImage.addEventListener("click", () => {
    bookstoreDialog.show();
  });
});