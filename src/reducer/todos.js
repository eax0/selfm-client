import {TODOS_TYPES as Actions} from '../constants/action_types'

const updateInArray = (items, id, fields) => {
    return items.map(item => {
        if (item.id !== id) {
            return item
        }

        if (typeof fields === 'function') {
            fields = fields(item);
        }

        return Object.assign({}, item, fields)
    });
}

const updateTodo = (items, id, fields) => {
    return updateInArray(items, id, Object.assign({modified: true}, fields)); 
}

export default function (todos = [], action = null) {
    switch (action.type) {
        case Actions.RECEIVE_TODOS:
            return action.todos;
        case Actions.ADD:
            const maxId = Math.max.apply(null, (todos.map(todo => {return todo.id})));

            return [
                ...todos,
                Object.assign({id: maxId + 1}, action.fields),
            ];
        case Actions.UPDATE:
            return updateTodo(todos, action.id, action.fields);
        case Actions.REMOVE:
            return todos.filter(todo => todo.id !== action.id);
        case Actions.TOGGLE:
            return updateTodo(todos, action.id, todo => {return {completed: !todo.completed}});
        // view
        case Actions.SET_EDITABLE:
            return updateTodo(todos, action.id, {editable: action.editable, modified: false});
        default:
            return todos
    }
}