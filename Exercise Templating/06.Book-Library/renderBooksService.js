import {render} from 'https://unpkg.com/lit-html?module';
import { getBooks } from "./booksServices.js";
import bookListTemplate from "./bookListTemplate.js";

export function renderBooks() {
    let rootElement = document.querySelector('body');

    getBooks()
        .then(result => {
            let bookListTemplateResult = bookListTemplate(result);

            render(bookListTemplateResult, rootElement);
        })
}