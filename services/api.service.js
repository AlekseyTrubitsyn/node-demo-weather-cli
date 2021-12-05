import axios from 'axios';
// import https from 'https';
import { getValue, STORE_DICTIONARY } from './storage.service.js';

export const getWeather = async(customCity) => {
    const [token, city] = await Promise.all([
        process.env.TOKEN || getValue(STORE_DICTIONARY.token),
        customCity || getValue(STORE_DICTIONARY.city)
    ]);

    // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    // url.searchParams.append('q', city);
    // url.searchParams.append('appid', token);
    // url.searchParams.append('lang', 'ru');
    // url.searchParams.append('units', 'metrics');

    // https.get(url, (response) => {
    //     let result = '';

    //     response.on('data', (data) => result += data);
    //     response.on('end', () => console.log(result));
    // });
    const response = await axios({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            'q': city,
            'appid': token,
            'lang': 'ru',
            'units': 'metrics',
        }
    });
    // console.log(response);

    return response.data;
}
