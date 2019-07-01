import config from "../../configs/config.js";
import {get, set, remove} from "./ls-service";

export const  serverUrl = path =>  `${config.SERVER_URL}:${config.SERVER_PORT}${path}`;

const usertoken = get('xxx-kon-dev-token');

export const _get_request = (myUrl, cb) => {
    return fetch( myUrl , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'xxx-kon-dev-token': usertoken
        }
    })
    .then(res => res.json())
    .then( (res) => cb(res) )
    .catch(error => console.error('Error:', error));
}

// export const _post_request = (myUrl, cb) => {
//     return fetch( myUrl , {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'xxx-kon-dev-token': usertoken
//         }
//     })
//     .then(res => res.json())
//     .then( (res) => cb(res) )
//     .catch(error => console.error('Error:', error));
// }