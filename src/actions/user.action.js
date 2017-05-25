/**
 * Created by intelligrape on 24/5/17.
 */
import {UPDATE_USER} from '../constants/action.constant';



export function updateUser(){
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: UPDATE_USER});

        }, 1000)
    }

}
