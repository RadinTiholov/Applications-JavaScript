async function request(url, option) {
 
    try {
      const response = await fetch(url, option);
   
      if (response.ok == false) {
        const error = response.json();
        alert("Ooops. Error! Try again!");
        throw new Error(error.message);
      }
   
      try {
        const data = await response.json();
        return data;
      } catch (err) {
        return response;
      }
    } catch (err) {
      throw err;
    }
  }
   
  export const settings = {
      host: 'http://localhost:3030'
  };
   
  function createOptions(method = 'get', data) {
   
      const options = {
          method,
          headers: {}
      };
   
      if(data) {
          options.headers['Content-Type'] = 'application/json';
          options.body = JSON.stringify(data);
      }
   
      const token = sessionStorage.getItem('userToken');
      if(token !== null) {
        options.headers['X-Authorization'] = token;
      }
   
      return options;
  }
   
   
  export async function get(url) {
      return await request(url, createOptions('get'));
  }
   
  export async function post(url, data) {
      return await request(url, createOptions('post', data));
  }
   
  export async function put(url, data) {
      return await request(url, createOptions('put', data));
  }
   
  export async function del(url) {
      return await request(url, createOptions('delete'));
  }
   
  export async function login(email, password) {
      const result = await post('http://localhost:3030/users/login', {email, password});
      sessionStorage.setItem('userId', result._id);
      sessionStorage.setItem('userToken', result.accessToken);
      sessionStorage.setItem('userEmail', result.email);
      sessionStorage.setItem('username', result.username);
      sessionStorage.setItem('gender', result.gender);
      return await result;
  }
   
  export async function register(data) {
    const result = await post('http://localhost:3030/users/register', data);
    console.log(result);
    sessionStorage.setItem('userId', result._id);
    sessionStorage.setItem('userToken', result.accessToken);
    sessionStorage.setItem('userEmail', result.email);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);
    return await result;
  }
   
  export async function logout() {
    const result = await get('http://localhost:3030/users/logout');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('gender');
    return await result;
  }