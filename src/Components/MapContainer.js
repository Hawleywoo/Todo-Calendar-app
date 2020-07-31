import React from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'


class MapContainer extends React.Component {

    state ={
        isOpen: false
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    displayMarkers = () => {
        return this.props.todos.map((todo, index)=> {
            let coords = { lat: todo.latitude,lng: todo.longitude}
            return (
                <Marker key={index} id={index} position={coords} >
                    {/* { this.state.isOpen && */}
                        <InfoWindow >
                        <h4>{ todo.title }</h4>
                        <p>{ todo.description}</p>
                        <p>{ todo.address}</p>
                        </InfoWindow>
                    {/* } */}
                </Marker>

            )
        })
    }
    
    render() {

        const mapStyles = {
            width: '100%',
            height: '50em',
          };

        return (
            <div className='map-div'>
                <h2>Todo Locations</h2>
                <Map
                
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{ lat: 39.7689, lng: -104.9741}}
                >
                    {this.displayMarkers()}
                </Map>
            </div>
        );
    }
}
const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer);

