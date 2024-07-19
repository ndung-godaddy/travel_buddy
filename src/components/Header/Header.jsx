import React from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
//useStyles is a hook so needs to be called in function
import useStyles from './styles'

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Buddy
                </Typography>
                <Box display ="flex">
                    <Typography variant="h7" className={classes.title} 
                    style={{ margin: '0 auto', padding: '20px'}}>
                        Explore New Places
                    </Typography>
                    {/* <Autocomplete> */}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder='Seach...'classes = {{root: classes.inputRoot, input: classes.inputInput}}
                            inputProps={{ 'aria-label': 'search' }}/>
                        </div>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;