import { renderBooks } from "./renderBooksService.js";
import { addBook } from "./booksServices.js";
import { editBook } from "./booksServices.js";
import { deleteBook } from "./booksServices.js";

export const url = "http://localhost:3030/jsonstore/collections/books";
let currBookId;

export function loadFunctionality(e) {
    e.preventDefault();

    renderBooks();
}

export function addFunctionality(e) {
    e.preventDefault();

    let submitForm = new FormData(e.currentTarget.parentNode);
    let titleInput = submitForm.get('title');
    let authorInput = submitForm.get('author');

    if (!(titleInput && authorInput)) {
        alert('All fields must be filled!');
        return;
    }

    addBook(authorInput, titleInput);

    e.currentTarget.parentNode.reset();
    loadFunctionality(e);
}

export function editFunctionality(e) {
    e.preventDefault();

    let submitFormElement = document.querySelector('#create-form');
    let editFormElement = document.querySelector('#edit-form');

    submitFormElement.setAttribute('class', 'hide');
    editFormElement.removeAttribute('class', 'hide');

    let titleInputElement = editFormElement.querySelector('input[name=title]');
    let authorInputElement = editFormElement.querySelector('input[name=author]');

    let currTitleElement = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling;
    let currAuthorElement = e.target.parentNode.previousSibling.previousSibling;

    console.log(currTitleElement);
    console.log(currAuthorElement);

    titleInputElement.value = currTitleElement.textContent;
    authorInputElement.value = currAuthorElement.textContent;

    currBookId = e.target.parentNode.parentNode.id;
}

export function saveEditFunctionality(e) {
    e.preventDefault();

    let submitFormElement = document.querySelector('#create-form');
    let editFormElement = document.querySelector('#edit-form');

    let newTitleInputElement = editFormElement.querySelector('input[name=title]');
    let newAuthorInputElement = editFormElement.querySelector('input[name=author]');

    editBook(newAuthorInputElement.value, newTitleInputElement.value, currBookId);

    newTitleInputElement.value = '';
    newAuthorInputElement.value = '';

    editFormElement.setAttribute('class', 'hide');
    submitFormElement.removeAttribute('class', 'hide');

    loadFunctionality(e);
}

export function deleteFunctionality(e) {
    e.preventDefault();

    let currElement = e.target.parentNode.parentNode;
    let currBookId = currElement.id;

    deleteBook(currBookId);

    currElement.remove();
}