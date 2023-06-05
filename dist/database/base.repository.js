"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const constants_1 = require("../constants");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async find(options) {
        return this.model.findAll(options);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findById(id, options) {
        return this.model.findByPk(id, options);
    }
    async paginate(options, page = constants_1.FIRST_PAGE, limit = constants_1.LIMIT_PAGE, opts) {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.rawPaginate(Object.assign({ where: Object.assign({}, options), offset,
            limit }, opts));
        return {
            items: rows,
            total: count,
            page,
            limit,
        };
    }
    async rawPaginate(options) {
        return await this.model.findAndCountAll(options);
    }
    async create(entity) {
        return this.model.create(entity);
    }
    async update(entity, conditions) {
        const [affectedCount, affectedRows] = await this.model.update(entity, {
            where: Object.assign({}, conditions),
            returning: true,
        });
        return affectedRows;
    }
    async delete(conditions) {
        return this.model.destroy({ where: conditions });
    }
    async raw(query) {
        return this.model.sequelize.query(query);
    }
    getModel() {
        return this.model;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map