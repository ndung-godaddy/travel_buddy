import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";

import {getPlacesData } from './api';
import Header from './components/Header/Header'
import Details from './components/Details/Details'
import List from './components/List/List'
import Map from './components/Map/Map'
import {createTheme, ThemeProvider} from "@mui/material/styles";

const App = () => {
    const[places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({lat:0, lng:0});
    const [bounds, setBounds] = useState(null);

const theme = createTheme()
    
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) =>{
            setCoordinates({ lat: latitude, lng: longitude});
        });
    },[]);

    useEffect(() => {
        if (bounds) {
            console.log(coordinates, bounds);
            getPlacesData(bounds.sw, bounds.ne)
                .then((data) => {
                    console.log(data);
                    setPlaces(data);
                })
                .catch((error) => {
                    console.error('Error fetching places data:', error);
                });
        }
    }, [coordinates, bounds]);
    
    return(
        <>
        <ThemeProvider theme ={theme}>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List  places={places}/>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates = {coordinates}/>
                </Grid>
            </Grid>
        </ThemeProvider>
        </>
    )
}

export default App;