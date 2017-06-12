import {TODOS_TYPES as Actions} from '../constants/action_types'
import * as ajax from '../ajax'

export function loadTodos() {
    return (dispatch) => ajax.get(Actions.LOAD_TODOS).then(response => {
        response.json().then(function (data) {
            dispatch(receiveTodos(data || []))
        });
    });
}

export function add(fields) {
    return {
        type: Actions.ADD,
        fields,
        meta: {remote: true}
    };
}

export function update(id, fields, remote = true) {
    return {
        type: Actions.UPDATE,
        id,
        fields,
        meta: {remote: !!remote}
    };
}

export function remove(id) {
    return {
        type: Actions.REMOVE,
        id,
        meta: {remote: true}
    };
}

export function receiveTodos(todos) {
    return {
        type: Actions.RECEIVE_TODOS,
        todos
    };
}