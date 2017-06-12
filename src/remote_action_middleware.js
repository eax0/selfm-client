import {post} from './ajax'

export default store => next => action => {
    if (action && action.meta && action.meta.remote) {
        post(action.type, action).then(res => {
            console.log(res);
        });
    }

    next(action);
}