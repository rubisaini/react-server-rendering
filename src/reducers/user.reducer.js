/**
 * Created by intelligrape on 24/5/17.
 */

import {UPDATE_USER} from '../constants/action.constant';
// Pick up any initial state sent by the server

export default function userReducer(state = {users : []}, action) {
    console.log("+++", state);
    switch (action.type) {
        case UPDATE_USER:
            let users = [...state.users, {name: 'abcd'}];

            return {...state, users};
        default:
            return state;
    }
}
