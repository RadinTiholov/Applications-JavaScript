import * as api from './api.js'; 

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function allGames(){
    return api.get('http://localhost:3030/data/games?sortBy=_createdOn%20desc');
}
export async function recentGames(){
    return api.get('http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category');
}
export async function create(data){
    return api.post('http://localhost:3030/data/games', data);
}
export async function getGame(id){
    return api.get(`http://localhost:3030/data/games/${id}`);
}
export async function del(id){
    return api.del(`http://localhost:3030/data/games/${id}`);
}
export async function edit(id, data){
    return api.put(`http://localhost:3030/data/games/${id}`, data);
}
export async function comment(data){
    return api.post(`http://localhost:3030/data/comments`, data);
}
export async function getComments(id){
    return api.get(`http://localhost:3030/data/comments?where=gameId%3D%22${id}%22`);
}