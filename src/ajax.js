const url = `${location.protocol}//${location.hostname}:3000/`;
const headers = new Headers({
    'Content-Type': 'application/json',
});

export function get(action) {
    return req(action, {
        headers,
        method: 'get'
    });
}

export function post(action, qParams = {}) {
    return req(action, {
        method: 'post',
        headers,
        body: parseParams(qParams)
    });
}

export function req(action, params) {
    return fetch(makeUrl(action), params);
}

export function makeUrl(action) {
    const [actionType, actionName] = action.split(':');

    return url + actionType + '/' + actionName;
}

export function parseParams(params) {
    return JSON.stringify(params);
    let arr = [];

    for (const key in params) {
        if (key !== 'type' && key !== 'meta' && params.hasOwnProperty(key)) {
            arr.push(`${key}=${params[key]}`);
        }
    }

    return arr.join('&');
}