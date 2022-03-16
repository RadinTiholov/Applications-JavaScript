const host = 'http://localhost:3030';

async function request(mehtod, url, data){
    const options = {
        mehtod,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(host + url, options);
        if (response.status == 200) {
            return response.json();
        }
        else if(response.status == 204){
            return response;
        }
        else{
            const error  = await response.json();
            throw new Error(error.message);
        }
    } catch (error) {
        alert(error);
        throw error;
    }
}
const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export {
    get,
    post,
    put,
    del as delete,
    request
}