import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';


import useStyles from './styles'

const Details = ({ place, selected, refProp }) => {

    if(selected) refProp?.current?.scrollIntoView({behavio: "smooth", block: "start"})
    const classes = useStyles();

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 300 }}
                image={place.photo ? place.photo.images.large.url : 'https://resizer.otstatic.com/v2/photos/wide-huge/3/53510132.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Rating value={Number(place.rating)} readOnly/>
                    <Typography variant='subtitle1'>{place.num_reviews || 'N/A'}Reviews</Typography>
                </Box>
                
                    {place.name}
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography variant='subtitle1'>{place.price_level || 'N/A'}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography variant='subtitle1'>{place.ranking || 'N/A'}</Typography>
                </Box>
                {place?.awards?.length > 0 ? (
                    <Box mt={2}>
                        <Typography variant="h6">Awards:</Typography>
                        {place.awards.map((award) => (
                            <Box
                                key={award.display_name}
                                display="flex"
                                alignItems="center"
                                my={1}
                                border={1}
                                borderColor="grey.300"
                                borderRadius={1}
                                p={1}
                                bgcolor="background.paper"
                            >
                                <img
                                    src={award.images.small}
                                    alt={award.display_name}
                                    style={{ maxWidth: '100px', height: 'auto', marginRight: '16px' }}
                                />
                                <Typography variant="body2">{award.display_name}</Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="textSecondary"></Typography>
                )}
                {place?.cuisine?.map(({name}) =>(
                    <Chip key={name} size='small' label={name} className={classes.chip}/>
                ))}
                {place?.address && (
                    <Typography gutterBottom variant='subtitle2' color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon/> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant='subtitle2' color="textSecondary" className={classes.subtitle}>
                        <PhoneIcon/> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button sixe="small" color = "primary" onClick={()=> window.open(place.web_url, '_blank')}>
                        Travel Advisor
                    </Button>
                    <Button sixe="small" color = "primary" onClick={()=> window.open(place.websiite, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default Details;

