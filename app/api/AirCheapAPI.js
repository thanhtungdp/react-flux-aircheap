import AirportActionCreators from '../actions/AirportActionCreators';
import constants from '../constants';
import 'whatwg-fetch';

let AirCheapAPI = {
    fetchAirports(){
        return fetch('airports.json')
            .then((response)=>response.json())
    },

    fetchTickets(){
        return fetch('flights.json')
            .then((response)=>response.json())
    }
}

export default AirCheapAPI;