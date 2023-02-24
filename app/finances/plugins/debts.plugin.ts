import { Server } from '@hapi/hapi';
import { getDebts } from '../helpers/debts';

export default {
    name: 'debts',
    register: (server: Server) => {
        server.route({
            method: 'GET',
            path: '/finances/debts',
            handler: async (request, h) => h.response(await getDebts())
        });
    }
};
