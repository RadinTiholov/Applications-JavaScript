import * as api from './api.js'; 

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getAllBooks() {
    return api.get('http://localhost:3030/data/books?sortBy=_createdOn%20desc');
}
export async function create(data){
    return api.post('http://localhost:3030/data/books', data);
}
export async function details(id){
    return api.get(`http://localhost:3030/data/books/${id}`);
}
export async function edit(data, id){
    return api.put(`http://localhost:3030/data/books/${id}`, data);
}
export async function del(id){
    return api.del(`http://localhost:3030/data/books/${id}`);
}
export async function getMyBooks(id){
    return api.get(`http://localhost:3030/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}
export async function like(bookId){
    return api.post(`http://localhost:3030/data/likes`, {bookId});
}
export async function totalLikes(bookId){
    return api.get(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}
export async function isLiked(bookId, userId){
    return api.get(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
