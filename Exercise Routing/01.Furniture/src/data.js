import * as api from './api.js'; 

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getAllFurniture() {
    return api.get('http://localhost:3030/data/catalog');
}
export async function getFurnitureDetails(id) {
    return api.get(`http://localhost:3030/data/catalog/${id}`);
}
export async function getMyFurniture(id) {
    return api.get(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`);
}
export async function createFurniture(data) {
    return api.post('http://localhost:3030/data/catalog', data);
}
export async function updateFurniture(id, data) {
    return api.put(`http://localhost:3030/data/catalog/${id}`, data);
}
export async function deleteFurniture(id) {
    return api.del(`http://localhost:3030/data/catalog/${id}`);
}