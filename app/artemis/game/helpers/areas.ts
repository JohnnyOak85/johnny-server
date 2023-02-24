import storage from '../../../storage/storage';
import ErrorHandler from '../../../tools/error';
import AreaDoc from '../interfaces/AreasDoc.interface';
import DB_NAME from '../shared/DB_NAME';

export const getAreas = async (area: string) => {
    try {
        const areas = await storage.get<AreaDoc>(DB_NAME, 'areas');

        if (!areas[area]) {
            throw ErrorHandler.notFound('Area does not exist');
        }

        return areas[area];
    } catch (error) {
        throw ErrorHandler.wrap(error, 'getAreas');
    }
};