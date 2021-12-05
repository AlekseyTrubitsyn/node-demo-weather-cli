import { homedir } from 'os';
// import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const isExist = async(path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

export const STORE_DICTIONARY = {
    token: 'token',
    city: 'city',
}

export const getFileData = async() => {
    const fileIsExist = await isExist(filePath);

    return fileIsExist ?
        JSON.parse(await promises.readFile(filePath)) : {};
}

export const saveKeyValue = async(key, value) => {
    const data = await getFileData();
    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data));
}

export const getValue = async(key) => {
    const data = await getFileData();

    return data[key];
}
