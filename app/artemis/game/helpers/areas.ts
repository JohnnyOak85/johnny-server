import { CacheHandler, ErrorHandler, StorageHandler } from '../../../tools';
import AreaDoc from '../interfaces/AreasDoc.interface';
import DB_NAME from '../shared/DB_NAME';

export const getCurrentArea = async () => {
    try {
        const currentArea = await CacheHandler.get('current-area');

        if (!currentArea) {
            throw ErrorHandler.notFound('Area is not set');
        }

        return currentArea;
    } catch (error) {
        throw ErrorHandler.wrap(error, 'getCurrentArea');
    }
};

export const setCurrentArea = async (currentArea: string) => {
    try {
        await CacheHandler.put('current-area', currentArea);

        return 'true';
    } catch (error) {
        throw ErrorHandler.wrap(error, 'setCurrentArea');
    }
};

export const getAreaData = async () => {
    try {
        const areas = await StorageHandler.get<AreaDoc>(DB_NAME, 'areas');
        const currentArea = await getCurrentArea();

        if (!areas[currentArea]) {
            throw ErrorHandler.notFound('Area is not set');
        }

        return areas[currentArea];
    } catch (error) {
        throw ErrorHandler.wrap(error, 'getAreaData');
    }
};

export const getAreaName = async () => {
    try {
        const currentArea = await getCurrentArea();

        return currentArea
            .split('_')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ');
    } catch (error) {
        throw ErrorHandler.wrap(error, 'getAreaName');
    }
};

export const getAreaMonsters = async () => {
    try {
        const currentArea = await getAreaData();

        return currentArea.map(rank => Object.keys(rank)).flat();
    } catch (error) {
        throw ErrorHandler.wrap(error, 'getAreaMonsters');
    }
};
