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