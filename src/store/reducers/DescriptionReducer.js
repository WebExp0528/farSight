import {GET_DETAILS} from '../types'

const initialState = {
    won:[],
    loading:true
}

export default function Descriptionreducer(state = initialState, action){

    switch(action.type){

        case GET_DETAILS:
        return {
            ...state,
            won:action.payload,
            loading:false

        }
       
        default: return state
    }

}
