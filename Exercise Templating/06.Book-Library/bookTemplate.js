import {html, render} from 'https://unpkg.com/lit-html?module';
import { editFunctionality, deleteFunctionality } from "./onClickHandlerService.js";

export default (books, x) => html `
    <tr id="${x}">
        <td>${books[x].title}</td>
        <td>${books[x].author}</td>
        <td>
            <button @click=${editFunctionality}>Edit</button>
            <button @click=${deleteFunctionality}>Delete</button>
        </td>
    </tr>
`;