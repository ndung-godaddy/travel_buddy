import React from 'react'
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/lab';
import useStyles from './styles'



const Map = ({setCoordinates, setBounds, coordinates}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    const handleApiLoaded = (map, maps) => {
        map.addListener('bounds_changed', () => {
            const bounds = map.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            setBounds({ ne: { lat: ne.lat(), lng: ne.lng() }, sw: { lat: sw.lat(), lng: sw.lng() } });
        });

        map.addListener('center_changed', () => {
            const center = map.getCenter();
            setCoordinates({ lat: center.lat(), lng: center.lng() });
        });
    };

    return (
        <div className= {classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:'AIzaSyBQgmO_CPASXpKliv09m9XXQPgTb4mARaA'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom = {14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={''}
            >

            </GoogleMapReact>
        </div>

    )
}

export default Map;

// AIzaSyAcMQL9HX8SxLLJhdyAeYG7KvJdXe7oGDk
//AIzaSyBQgmO_CPASXpKliv09m9XXQPgTb4mARaA