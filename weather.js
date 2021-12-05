import getArgs from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printResult, printSuccess } from './services/log.service.js';
import { getValue, saveKeyValue, STORE_DICTIONARY } from './services/storage.service.js';

const saveToken = async(token) => {
    if (!token.length) {
        printError('empty token');
        return;
    }

    try {
        await saveKeyValue(STORE_DICTIONARY.token, token);
        printSuccess('token saved');
    } catch (e) {
        printError(e);
    }
};

const getForecast = async(city) => {
    try {
        return await getWeather(city);
    } catch(e) {
        switch (true) {
            case (e?.response?.status === 404):
                printError('Неверно указан город');
                return;
            case (e?.response?.status === 401):
                printError('Неверно указан token');
                return;
            default:
                printError(e.message);
                return;
        }
    }
};

const initCLI = async() => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    };

    if (args.t) {
        await saveToken(args.t);
    };

    if (args.c) {
        await saveKeyValue('city', args.c);
    };

    const forecast = await getForecast();

    if (forecast) {
        printResult(forecast);
    }
};

initCLI();

// e217a97b17dda6cbe34ef73577dba7f3
