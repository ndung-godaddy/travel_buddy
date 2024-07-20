import axios from 'axios';



export const getPlacesData = async (type,sw, ne) => {
    try {
        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`, {
            params: {
                latitude: '37.774929',
                longitude: '-122.419416',
                limit: '30',
                currency: 'USD',
                distance: '200',
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

// https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng

