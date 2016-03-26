import AppDispatcher from '../AppDispatcher'
import constants from '../constants'
import AirCheapApi from '../api/AirCheapAPI'

let AirportActionCreators = {
    fetchAirports(){
        AppDispatcher.dispatchAsync(AirCheapApi.fetchAirports(), {
            request: constants.FETCH_AIRPORT,
            success: constants.FETCH_AIRPORT_SUCCESS,
            failure: constants.FETCH_AIRPORT_ERROR
        })
    },
    chooseAirport(target, code){
        AppDispatcher.dispatch({
            type: constants.CHOOSE_AIRPORT,
            target,
            code
        })
    },
    fetchTickets(){
        AppDispatcher.dispatchAsync(AirCheapApi.fetchTickets(), {
            request: constants.FETCH_TICKETS,
            success: constants.FETCH_TICKETS_SUCCESS,
            failure: constants.FETCH_TICKETS_ERROR
        })
    },
}

export default AirportActionCreators;