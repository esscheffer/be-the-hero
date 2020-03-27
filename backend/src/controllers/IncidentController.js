const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const [count] = await connection('incidents').count();
        response.header('X-Total-Count', count['count(*)']);

        const {page = 1} = request.query;
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .select('*')
            .limit(5)
            .offset((page - 1) * 5);

        return response.json(incidents);
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({id});
    },

    async delete(request, response) {
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .select('ong_id')
            .where('id', id)
            .first();

        if (incident && incident.ong_id !== ong_id) {
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};
