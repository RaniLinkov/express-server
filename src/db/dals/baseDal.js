export const initBaseDal = (knex, tableName) => {
    return {
        create: (data) => {
            return knex(tableName).insert(data).returning("*");
        },
        read: (filter = {}) => {
            return knex(tableName).where(filter);
        },
        update: (filter, data) => {
            return knex(tableName).where(filter).update(data).returning("*");
        },
        delete: (filter) => {
            return knex(tableName).where(filter).del().returning("*");
        }
    }
};
