import {TODOS_TYPES as Actions} from '../constants/action_types'

const updateInArray = (items, field, fieldValue, fields) => {
    return items.map(item => {
        if (item[field] !== fieldValue) {
            return item
        }

        if (typeof fields === 'function') {
            fields = fields(item);
        }

        return Object.assign({}, item, fields)
    });
}

const updateTodo = (items, id, fields) => {
    return updateInArray(items, 'id', id, Object.assign({modified: true}, fields));
}

const readResponse = (todos, fromAction, response) => {
    switch (fromAction) {
        case Actions.ADD:
            return updateInArray(todos, 'tempId', response.tempId, response)
        case Actions.UPDATE:
            return updateTodo(todos, 'id', response.id, response);
    }

    return todos
}

const tempId = () => Math.random().toString(36).slice(2)

export default function (todos = [], action = null) {
    switch (action.type) {
        case Actions.RECEIVE_TODOS:
            return action.todos;
        case Actions.ADD:
            return [
                ...todos,
                Object.assign({tempId: tempId()}, action.fields),
            ];
        case Actions.UPDATE:
            return updateTodo(todos, action.id, action.fields);
        case Actions.REMOVE:
            return todos.filter(todo => todo.id !== action.id);
        case Actions.TOGGLE:
            return updateTodo(todos, action.id, todo => {return {completed: !todo.completed}});
        case Actions.READ_RESPONSE:
            return readResponse();
        // view
        case Actions.SET_EDITABLE:
            return updateTodo(todos, action.id, {editable: action.editable, modified: false});
        default:
            return todos
    }
}