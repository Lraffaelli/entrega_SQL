const knex = require('knex');
const{configMySQL, configSGLite}=require('../src/config')

try {
    const clientDB = knex(configMySQL.config)
    await clientDB.schema.dropTableIfExist(configMySQL.table)

    await clientDB.schema.createTable(configMySQL.table, table=>{
        table.increment('id').primary(),
        table.string('name'),
        table.string('price'),
        table.string('picture')
    })

    await clientDB.destroy()

    console.log('Se creo la tabla')
} catch (error) {
    
}