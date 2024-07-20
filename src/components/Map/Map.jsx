import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@mui/lab/Rating';
import useStyles from './styles'



const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, childClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    useState[childClicked, setChildClicked] = useState(null);

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
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) =>(
                    <div
                    className={classes.markerContainer}
                    lat= {Number (place.latitude)}
                    lng= {Number (place.longitude)}
                    key={i}>
                        {
                            !isDesktop?(
                                <LocationOnOutlinedIcon color="primary" fontsize="large"/>
                            ):(<Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant = "subtitile2" gutterBottom >
                                    {place.name}
                                </Typography>
                                <img 
                                className={classes.pointer}
                                src={place.photo ? place.photo.images.large.url : 'https://resizer.otstatic.com/v2/photos/wide-huge/3/53510132.jpg'}
                                alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly/>
                            </Paper>)
                        }

                    </div>
                ))}

            </GoogleMapReact>
        </div>

    )
}

export default Map;

// AIzaSyAcMQL9HX8SxLLJhdyAeYG7KvJdXe7oGDk
//AIzaSyBQgmO_CPASXpKliv09m9XXQPgTb4mARaA