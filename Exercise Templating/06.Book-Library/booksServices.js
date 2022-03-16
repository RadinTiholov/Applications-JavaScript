import { url } from "./onClickHandlerService.js";

export function addBook(author, title) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author,
            title,
        })
    });
}

export function deleteBook(currBookId) {
    fetch(`${url}/${currBookId}`, {
        method: 'DELETE'
    });
}

export function editBook(author, title, currBookId) {
    fetch(`${url}/${currBookId}`, {
        method: 'PUT',
        endpoint: `/jsonstore/books/${currBookId}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author,
            title,
        })
    });
}

export function getBooks() {
    return fetch(url)
        .then(res => res.json());
}