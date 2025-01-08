import {API_BASE_URL} from "../constants/index.jsx";


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getAllEmployees() {
    return request({
        url: API_BASE_URL + "/employee",
        method: 'GET'
    });
}

export function searchEmployees(query) {
    return request({
        url: API_BASE_URL + "/employee/search?query="+query,
        method: 'GET'
    });
}
export function createUpdateEmployee(data) {
    return request({
        url: API_BASE_URL + "/employee",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function deleteEmployee(id) {
    return request({
        url: API_BASE_URL + "/employee/"+id,
        method: 'DELETE',
    });
}