import {READ_RESPONSE} from '../constants/action_types'

export function readResponse(fromAction, response) {
    return {
        type: READ_RESPONSE,
        fromAction,
        response
    };
}