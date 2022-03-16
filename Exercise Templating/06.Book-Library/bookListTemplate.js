import {html} from 'https://unpkg.com/lit-html?module';
import { loadFunctionality, addFunctionality, editFunctionality, saveEditFunctionality } from "./onClickHandlerService.js";
import bookTemplate from "./bookTemplate.js";

export default (books) => html `
    <button @click=${loadFunctionality} id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${Object.keys(books).map(x => html`${bookTemplate(books, x)}`)}
        </tbody>
    </table>
    <form id="create-form">
        <h3>FORM</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <button @click=${addFunctionality}>Submit</button>
    </form>
    <form id="edit-form" class="hide">
        <h3>Edit FORM</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <button @click=${saveEditFunctionality} id="save-edit">Save</button>
    </form>
`;