import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';

export const getPlacesData = async (sw, ne) => {
    try {
        const response = await axios.get(URL, {
            params: {
                latitude: sw.lat && ne.lat,
                longitude: ne.lng && sw.lng,
                limit: '30',
                currency: 'USD',
                distance: '2',
                open_now: 'false',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'x-rapidapi-key': 'a08ff1b15cmsh9807df0c3c4b5cep17a3dajsn483f2f68e928',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });

        console.log('API Response:', response);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching places data:', error);
        return [];
    }
};

