const url = 'http://localhost:3030/jsonstore/advanced/table';

export async function getUsers() {
    const response = await fetch(url);
    return await response.json();
}