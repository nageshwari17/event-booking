import {SEARCH_EVENTS, GET_EVENTS} from '../actions/types'
import data from '../db.json'

const initialState = {
    eventList: data,
    event: []
}

export default (state=initialState, action) => {
    switch(action.type){
        case SEARCH_EVENTS:
            return {
                ...state,
                eventList: (action.paylod.trim() ? data.filter(event => event.name.toLowerCase().includes(action.paylod.toLowerCase())) : data)
            };
        case GET_EVENTS:
            return {
                ...state,
                event: action.paylod ? data.filter(event => event.id === parseInt(action.paylod)): []
            }
        default:
            return state
    }
}


export const searchEvents = (input) => {
    return {
        type:SEARCH_EVENTS,
        paylod: input
    }
}

export const getEvent = (id) => {
    return {
        type:GET_EVENTS,
        paylod: id
    }
}

