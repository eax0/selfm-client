import {post} from './ajax'
import {readResponse} from './actions/common'

export default store => next => action => {
    if (action && action.meta && action.meta.remote) {
        post(action.type, action)
            .then(response => response.json())
            .then(json => store.dispatch(readResponse(action.type, json)));
    }

    next(action);
}