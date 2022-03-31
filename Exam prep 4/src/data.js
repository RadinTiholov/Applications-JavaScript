import * as api from './api.js'; 

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getAllMemes(){
    return api.get('http://localhost:3030/data/memes?sortBy=_createdOn%20desc');
}
export async function create(data){
    return api.post('http://localhost:3030/data/memes', data);
}
export async function getItem(id){
    return api.get(`http://localhost:3030/data/memes/${id}`);
}
export async function edit(data, id){
    return api.put(`http://localhost:3030/data/memes/${id}`, data);
}
export async function del(id){
    return api.del(`http://localhost:3030/data/memes/${id}`);
}
export async function getAllMyMemes(id){
    return api.get(`http://localhost:3030/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}