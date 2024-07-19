import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState({ });

    const theme = createTheme();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        if (bounds.sw,bounds.ne) {
            console.log('Coordinates and bounds:', coordinates, bounds);
            getPlacesData(bounds.sw, bounds.ne)
                .then((data) => {
                    console.log('Fetched places data:', data);
                    setPlaces(data);
                })
        }
    }, [coordinates, bounds]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default App;
