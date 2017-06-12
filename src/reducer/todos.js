import {TODOS_TYPES as Actions} from '../constants/action_types'

function updateTodo(todos, id, fields) {
    return todos.map(todo => {
        if (todo.id === id) {
            return Object.assign({}, todo, fields)
        }

        return todo
    })
}

export default function(state = [], action = null) {
    switch (action.type) {
        case Actions.RECEIVE_TODOS:
            return action.todos;
        case Actions.ADD:
            const maxId = Math.max.apply(null, (state.map(todo => {return todo.id})));

            return [
                ...state,
                Object.assign({id: maxId + 1}, action.fields),
            ];
        case Actions.UPDATE:
             return updateTodo(state, action.id, action.fields);
        case Actions.REMOVE:
            return state.filter(todo => {
                return todo.id !== Number(action.id);
            })
        case Actions.TOGGLE:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }

                return todo
            })
        case Actions.SET_EDITABLE:
            return updateTodo(state, action.id, {editable: action.editable});
        default:
            return state
    }
}