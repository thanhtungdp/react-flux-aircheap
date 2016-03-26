import React,{Component} from 'react';
import {render} from 'react-dom';
import {Container} from 'flux/utils'
import Autosuggest from 'react-auto-suggest';
import AirportStore from './stores/AirportStore';
import RouteStore from './stores/RouteStore';
import TicketStore from './stores/TicketStore';
import AirportActionCreators from './actions/AirportActionCreators';
import TicketItem from './components/TicketItem';

class App extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        AirportActionCreators.fetchAirports();
    }

    componentWillUpdate(nextProps, nextState) {
        let originAndDestinationSelected = nextState.origin && nextState.destination;
        let selectionHasChangedSinceLastUpdate = nextState.origin !== this.state.origin || nextState.destination !== this.state.destination;
        if (selectionHasChangedSinceLastUpdate && originAndDestinationSelected) {
            console.log('fetch tickets');
            AirportActionCreators.fetchTickets(nextState.origin, nextState.destination);
        }
    }

    getSuggestions(input, callback) {
        if (input) {
            const escapedInput = input.trim().toLowerCase();
            const airportMatchRegex = new RegExp('\\b' + escapedInput, 'i');
            const suggestions = this.state.airports
                .filter((airport) => airportMatchRegex.test(airport.city))
                .sort((airport1, airport2) => {
                    return airport1.city.toLowerCase().indexOf(escapedInput) -
                        airport2.city.toLowerCase().indexOf(escapedInput)
                })
                .slice(0, 7)
                .map((airport)=> `${airport.city} - ${airport.country} (${airport.code})`);
            callback(suggestions);
        }
        else {
            const suggestions = this.state.airports.slice(0, 7).map((airport)=> `${airport.city} - ${airport.country} (${airport.code})`);
            callback(suggestions);
        }
    }

    handleSelect(target, suggestion, event) {
        const airportCodeRegex = /\(([^)]+)\)/;
        let airportCode = airportCodeRegex.exec(suggestion)[1];
        AirportActionCreators.chooseAirport(target, airportCode);
    }


    render() {
        let ticketList = this.state.tickets.map((ticket)=>(
            <TicketItem key={ticket.id} ticket={ticket} />
        ));
        console.log(this.state.tickets);
        return (
            <div>
                <header>
                    <div className="header-brand">
                        <img src="logo.png" height="35"/>
                        <p>Check discount ticket prices and pay using your Aircheap points</p>
                    </div>
                    <div className="header-route">
                        <Autosuggest
                            id="from"
                            suggestions={this.getSuggestions.bind(this)}
                            onSuggestion={this.handleSelect.bind(this,'origin')}
                            value={this.state.origin}
                            inputAttributes={{placeholder:'From'}}/>
                        <Autosuggest
                            id="to"
                            suggestions={this.getSuggestions.bind(this)}
                            onSuggestion={this.handleSelect.bind(this,'destination')}
                            value={this.state.origin}
                            inputAttributes={{placeholder:'To'}}/>
                    </div>
                </header>
                <div>
                    {ticketList}
                </div>
            </div>
        )
    }
}

App.getStores = ()=>([AirportStore, RouteStore, TicketStore]);
App.calculateState = (prevState)=>({
    airports: AirportStore.getState(),
    origin: RouteStore.get('origin'),
    destination: RouteStore.get('destination'),
    tickets: TicketStore.getState()
});

let AppContainer = Container.create(App);

render(<AppContainer/>, document.getElementById('root'))