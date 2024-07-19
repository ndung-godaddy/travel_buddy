import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng'

export const getPlacesData = async (sw, ne) => {
    try{
        const {data: {data}} = await axios.get(URL, {
            params: {
                // latitude: sw.lat,
                // longitude: ne.lng,
                // limit: '30',
                // currency: 'USD',
                // distance: '2',
                // open_now: 'false',
                // lunit: 'km',
                // lang: 'en_US'
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              
            },
            headers: {
                'x-rapidapi-key': 'a08ff1b15cmsh9807df0c3c4b5cep17a3dajsn483f2f68e928',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;
    } catch (error) {
        console.log('API response:');
        console.error('Error fetching places data:', error);
        return [];
        
    }
};
