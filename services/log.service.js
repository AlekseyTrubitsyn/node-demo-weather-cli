import chalk from 'chalk';
import dedent from 'dedent-js';
import { format, fromUnixTime } from 'date-fns';
import _round from 'lodash/round.js';

export const printError = (error) => {
    console.log(`${chalk.bgRed(' ERROR ')}: ${error}`);
};

export const printSuccess = (message) => {
    console.log(`${chalk.bgGreenBright(' SUCCESS ')}: ${message}`);
};

export const printHelp = () => {
    console.log(dedent(`
        ${chalk.bgBlue(' HELP ')}

        -c [CITY]
        -t [TOKEN]
    `));
};

const getIcon = (code) => {
    switch (code.slice(0, 2)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '⛅';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '⛈️';
        case '13':
            return '🌨️';
        case '50':
            return '🌫️';
        default:
            return '☃️'
    }
};
export const printResult = (data) => {
    if (!data) return;

    const { sys, main, wind, name: city } = data;
    const weather = data.weather?.[0];

    const getHHmm = (ms) => format(fromUnixTime(ms), 'HH:mm');
    const getTemp = (temp) => _round(temp > 100 ? temp - 269.83 : temp);

    console.log(`
        ${chalk.bgYellow.black(` Погода в г. ${city} `)}
        ${getIcon(weather.icon)}  ${getTemp(main.temp)}, ${weather.description || 'н.д.'}
        💧 влажность ${main.humidity}
        💨 ветер: ${wind.speed} м/с
        🌅 рассвет: ${getHHmm(sys.sunrise)}
        🌇 закат: ${getHHmm(sys.sunset)}
    `);
};
