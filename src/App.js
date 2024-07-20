import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
    const [places, setPlaces] = useState([]);
    const[childClicked, setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState({ });
    const[isLoading, setisLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    // const theme = createTheme();
    const theme = createTheme({
        palette: {
          background: {
            default: "#FEF3E2"
          },
        }
      });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
        setisLoading(true);
        if (bounds) {
            console.log('Coordinates and bounds:', coordinates, bounds);
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    console.log('Fetched places data:', data);
                    setPlaces(data);
                    setisLoading(false)
                })
        }
    }, []);

    useEffect(() => {
        
        setisLoading(true);
        if (bounds.sw,bounds.ne) {
            console.log('Coordinates and bounds:', coordinates, bounds);
            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    console.log('Fetched places data:', data);
                    setPlaces(data);
                    setisLoading(false)
                })
        }
    }, [ type ]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default App;
