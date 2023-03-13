import { resourcesPath } from '../../../paths';
import { getFile, ServerRequest, ServerResponse, wrapError } from '../../shared';

export const mainHandler = async (request: ServerRequest, h: ServerResponse) => {
    try {
        return h.response(getFile(`${resourcesPath}/pages/main.html`).toString('utf8'));
    } catch (error) {
        throw wrapError(error, 'buildMainPage');
    }
};