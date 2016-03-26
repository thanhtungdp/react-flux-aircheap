import {ReduceStore} from 'flux/utils'
import AppDispatcher from '../AppDispatcher'
import constants from '../constants'

class AirportStore extends ReduceStore {
    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {
            case constants.FETCH_AIRPORT_SUCCESS:
                return action.payload.response;
            default:
                return state;
        }
    }
}

export default new AirportStore(AppDispatcher)